const passport = require('passport');
const ExpressBrute = require('express-brute');
const MongooseStore = require('express-brute-mongoose');
const BruteForceSchema = require('express-brute-mongoose/dist/schema');
const { Strategy } = require('passport-local');
const mongoose = require('mongoose');
const { UserModel, PropertieModel, PromotedModel } = require('./models');
const msg = require('./utils/message');
const joiSchema = require('./middleware/schema');
const { listCollection } = require('./middleware/express');
const requestMiddleware = require('./middleware/request');

const model = mongoose.model(
  'bruteforce',
  new mongoose.Schema(BruteForceSchema)
);
const store = new MongooseStore(model);

const bruteforce = new ExpressBrute(store);

const signUpPath = '/auth/signup';
const signInPath = '/auth/signin';

const SignRequsts = [
  { path: signUpPath, schema: joiSchema.user.public.user.signUp },
  { path: signInPath, schema: joiSchema.user.public.user.signIn },
];

const auth = ({ server }) => {
  const verify = async (req, email, password, cb) => {
    const reqPath = req.path;
    const data = { ...req.body, email, password };

    let user = null;
    try {
      if (reqPath === signInPath) user = await UserModel.signIn(data);
      else if (reqPath === signUpPath) {
        user = await UserModel.signUp(data);
      } else return msg.wrongInfo('path');

      cb(null, user);
    } catch (error) {
      const err = msg.convertHttpErrors(error);

      if (err.message) return cb(null, null, err);
      cb(err, null);
    }
  };

  passport.use(
    new Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      verify
    )
  );
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserModel.getById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  server.use(passport.initialize());
  server.use(passport.session());

  SignRequsts.forEach(({ path, schema }) =>
    server.post(
      path,
      // bruteforce.prevent,
      requestMiddleware(schema),
      (req, res, next) => {
        passport.authenticate('local', (err, reqUser, info) => {
          if (err) return next(err);
          if (!reqUser) return res.status(401).json({ message: info.message });

          req.login(reqUser, (error) => {
            if (error) return next(error);

            res.json({ user: reqUser });
          });
        })(req, res, next);
      }
    )
  );
  server.get(
    '/promoted',
    listCollection(async () => {
      const { list = [] } = await PromotedModel.list();

      return { list };
    })
  );
  server.post(
    '/publicSearch',
    listCollection(
      async ({
        req: {
          body: { typeOfProperty, ...rest },
          user,
        },
      }) => {
        const args = {
          ...rest,
          typeOfProperty:
            typeOfProperty && typeOfProperty.length > 0
              ? typeOfProperty.split(',')
              : [],
        };
        const { list } = await PropertieModel.publicSearch(args);
        if (user) await UserModel.updateLastSearch(user._id, args);

        // console.log({ args, user });
        return { list };
      },
      joiSchema.propertie.student.search
    )
  );

  server.post(
    '/properties',
    listCollection(
      async ({
        req: {
          body: { typeOfProperty, ...args },
        },
      }) => {
        const { list } = await PropertieModel.search({
          ...args,
          typeOfProperty:
            typeOfProperty && typeOfProperty.length > 0
              ? typeOfProperty.split(',')
              : [],
        });

        return { list };
      },
      joiSchema.propertie.student.search
    )
  );

  server.get('/auth/logout', (req, res) => {
    req.logout();
    res.json({ success: 'sucess' });
  });

  server.post(
    '/auth/forgotPassword',
    requestMiddleware(joiSchema.user.public.user.forgotPassword),
    async ({ body } = {}, res) => {
      try {
        const { user } = await UserModel.forgotPassword(body);
        res.json({ user });
      } catch (error) {
        res.status(401).json({ message: error.message });
      }
    }
  );

  server.post(
    '/auth/resetPassword',
    requestMiddleware(joiSchema.user.public.user.resetPassword),
    async (req, res) => {
      try {
        const { user } = await UserModel.resetPassword(req.body);
        req.login(user, (error) => {
          if (error) return res.status(401).json({ message: error.message });

          res.json({ user });
        });
      } catch (error) {
        res.status(401).json({ message: error.message });
      }
    }
  );
};
module.exports = auth;
