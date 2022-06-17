const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const {
  isMajor,
  pick,
  toggleArrayOfObj,
} = require('../../helpers/convertAndCheck');
const {
  RoleList,
  StatusList,
  Admin,
  Inactive,
  generateSlug,
  Roomer,
  ucFirst,
  isValidateEmail,
} = require('../../helpers/user');
const { defaultLimit, defaultOffset } = require('../../helpers/query');
const DBModel = require('./Model');
const PropertyModel = require('./Propertie');
const msg = require('../utils/message');
const { sendForgotPassword, sucessSponsorshipUsed } = require('../utils/mail');
const bcrypt = require('../utils/bcrypt');
const { ROOT_URL } = require('../../config');

// const { sendMail } = require("../services/mail");
const logger = require('../logs');

const { Schema } = mongoose;
const modelName = 'User';

const mongoSchema = new Schema(
  {
    picture: {
      type: String,
      default: `${ROOT_URL}/static/img/users/default-picture.png`,
      // required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      index: true,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      // required: true,
    },
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Propertie' }],
    sponsorshipCode: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Date,
      validate: {
        validator: (v) => isMajor(v),
        message: msg.notMajor,
      },
    },
    school: {
      type: String,
    },
    role: {
      type: String,
      enum: RoleList,
      default: Roomer,
      required: true,
    },
    status: {
      type: String,
      enum: StatusList,
      default: Inactive,
      // required: true,
    },
    provider: {
      type: String,
    },
    referrer_url: {
      type: String,
    },
    lastSearch: {
      type: [Object],
    },
    lastViewed: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Propertie' }],
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

class UserClass extends DBModel {
  static publicFields() {
    return [
      '_id',
      'picture',
      'firstName',
      'lastName',
      'bookmarks',
      'sponsorshipCode',
      'school',
      'phone',
      'email',
      'isAdmin',
      'slug',
      'role',
      'status',
      'age',
      'lastSearch',
      'lastViewed',
    ];
  }

  static async getId(where) {
    const user = await this.findOne(where)
      .populate('bookmarks')
      .select('_id')
      .lean();

    if (!user) return { userId: null };

    return { userId: user._id };
  }

  static async updateById(_id, updates) {
    console.log("PASSE LÀ")
    const userDoc = await this.findOne({ _id }).populate('bookmarks');
    const salt = await bcrypt.genSalt(10);

    if (!userDoc) {
      throw new Error(msg.notFound('User'));
    }

    if (!isValidateEmail(updates.email))
      throw new Error(msg.invalidInfo('Email'));
    Object.entries(updates)
      // eslint-disable-next-line no-unused-vars
      .filter(([_, value]) => value !== undefined)
      .forEach(([key, value]) => {
        userDoc[key] = value;
      });
    userDoc.firstName = ucFirst(userDoc.firstName);
    userDoc.lastName = ucFirst(userDoc.lastName);

    if (updates.password)
      userDoc.password = await bcrypt.hash(updates.password, salt);
    await userDoc.save();
    const user = await this.findOne({ _id }).populate('bookmarks').lean();

    return { user: pick(user, this.publicFields()) };
  }

  static async forgotPassword({ email }) {
    const userDoc = await this.findOne({ email });
    const token = await bcrypt.genSalt(10);

    if (!userDoc) throw new Error(msg.notFound('Email'));

    userDoc.resetPasswordToken = token;
    userDoc.resetPasswordExpires = Date.now() + 3600000;
    userDoc.save();
    const to = userDoc.email;
    sendForgotPassword({ token, to });
    return { user: to };
  }

  static async resetPassword({ token, password }) {
    const userDoc = await this.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    const salt = await bcrypt.genSalt(10);

    if (!userDoc) throw new Error(`${msg.notFound('Token')} ou expiré`);

    userDoc.password = await bcrypt.hash(password, salt);
    userDoc.resetPasswordToken = null;
    userDoc.resetPasswordExpires = null;
    userDoc.save();
    return { user: pick(userDoc.toObject(), this.publicFields()) };
  }

  static async getUserZones(_id) {
    const list = await this.findOne(_id).select('zones').lean();

    return { list };
  }

  static async getIdBySlug({ slug }) {
    return this.getId({ slug });
  }

  static async getByEmail({ email }) {
    const userDoc = await this.findOne({ email });
    return !userDoc ? { userExist: false } : { userExist: true };
  }

  static async listStudents({
    limit = defaultLimit,
    offset: page = defaultOffset,
  } = {}) {
    const query = { role: { $ne: Admin } };
    const list = await this.paginate(query, {
      page,
      limit,
      sort: { created_at: 'desc' },
    });

    return { list };
  }

  static async add(options) {
    const { email, firstName, lastName } = options;
    const slug = await generateSlug(this, firstName + lastName);
    const salt = await bcrypt.genSalt(10);

    let user = options;

    if (!isValidateEmail(user.email)) throw new Error(msg.invalidInfo('Email'));
    user.firstName = ucFirst(user.firstName);
    user.lastName = ucFirst(user.lastName);

    if (user.password) user.password = await bcrypt.hash(user.password, salt);
    user = await this.create({ ...options, slug });

    if (email) {
      // Send Email
    }

    return { user };
  }

  static async addBookmark(id, propertyId) {
    const userDoc = await this.findById(id).populate('bookmarks');
    const property = await PropertyModel.findById(propertyId);

    userDoc.bookmarks = toggleArrayOfObj(
      userDoc.bookmarks,
      property,
      (e) => e._id
    );
    userDoc.save();
    const user = userDoc.toObject();

    return { user: pick(user, this.publicFields()) };
  }

  static async delete(_id) {
    try {
      await this.deleteOne({ _id });

      return await this.listStudents();
    } catch (error) {
      logger.error(error);
      throw new Error('Error white delete');
    }
  }

  /**
   * Get a User by its slug
   * @param {Object} params
   * @param {String} params.slug - The slug of the User to get
   */
  static async getBySlug({ slug }) {
    const userDoc = await this.findOne({ slug }).select(this.publicFields());

    if (!userDoc) {
      throw new Error(msg.notFound('User'));
    }
    const user = userDoc.toObject();

    return { user };
  }

  /**
   * Get a User by its slug
   * @param {Object} params
   * @param {String} params.slug - The slug of the User to get
   */
  static async getById(_id) {
    let userDoc = null;

    try {
      userDoc = await this.findOne({ _id })
        .populate('bookmarks')
        .select(this.publicFields());
      if (!_id || !userDoc) {
        throw new Error(msg.notFound('User'));
      }
      userDoc = userDoc.toObject();
    } catch (err) {
      logger.error(err);
    }

    return userDoc;
  }

  static async signInOrSignUpViaSocialMedia({
    role,
    email,
    password,
    provider,
    avatarUrl,
    firstName,
    lastName,
  }) {
    let user = await this.findOne({ email });

    if (!user) {
      user = (
        await this.add({
          // set role
          role: 'buyer',
          email,
          password,
          firstName,
          provider,
          lastName,
          picture: avatarUrl,
        })
      ).user;
    }
    user = user.toObject();

    return pick(user, this.publicFields());
  }

  static async signIn(options) {
    const { email, password } = options;

    let user = await this.findOne({ email }).populate('bookmarks');

    if (!user) throw new Error(msg.notFound('Email'));
    if (!user.password) throw new Error('Account has no password');

    const isMatch = await bcrypt.compare(password, user.password);

    user = user.toObject();
    if (isMatch) return pick(user, this.publicFields());
    throw new Error(msg.invalidInfo('password'));
  }

  static async getLastSearch(userId) {
    const userSearch = await this.findById(userId)
      .select('lastSearch lastViewed')
      .populate('lastViewed')
      .lean();

    return { userSearch };
  }

  static async updateLastSearch(userId, args) {
    const user = await this.findById(userId);
    let lastSearch = user.lastSearch?.slice(0, 5) || [];

    if (JSON.stringify(args) !== JSON.stringify(lastSearch[0]))
      lastSearch = [args, ...lastSearch];

    const rest = await this.updateOne(
      { _id: userId },
      { $set: { lastSearch } }
    );

    return rest;
  }

  static async updateLastViewed(userId, propertyId) {
    const user = await this.findById(userId);

    let lastViewed = user.lastViewed?.slice(0, 5) || [];
    if (propertyId !== lastViewed[0]) lastViewed = [propertyId, ...lastViewed];
    console.log(propertyId !== lastViewed[0], lastViewed);
    const rest = await this.updateOne(
      { _id: userId },
      { $set: { lastViewed } }
    );

    return rest;
  }

  static async signUp(options) {
    let user = null;
    let receiver = null;

    if (options.sponsorshipCode) {
      receiver = await this.findOne({ slug: options.sponsorshipCode });
      if (!receiver) throw new Error(msg.invalidInfo('Code de parrainage'));
    }
    const existingUser = await this.findOne({
      $or: [{ email: options.email }, { phone: options.phone }],
    });
    if (existingUser) {
      throw new Error(
        `${
          existingUser.email === options.email
            ? 'Cet email'
            : 'Ce numéro de téléphone'
        } est déjà associé à un compte`
      );
    }

    user = (await this.add(options)).user;
    user = user.toObject();

    if (options.sponsorshipCode)
      sucessSponsorshipUsed({ sender: user, receiver });
    return pick(user, this.publicFields());
  }
}

UserClass.name = modelName;
mongoSchema.loadClass(UserClass);
mongoSchema.plugin(mongoosePaginate);
const User = mongoose.model(modelName, mongoSchema);

module.exports = User;
