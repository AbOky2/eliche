const { RoleList, Student, isStudent } = require('../../helpers/user');
const logger = require('../logs');
const msg = require('../utils/message');
const joiSchema = require('./schema');
const requestMiddleware = require('./request');
const { UserModel } = require('../models');
/**
 * Creates a middleware that tries to execute a function
 * and catch eventual errors to send them as a json response
 * @param {(req: Request, res: Response) => any} fn
 * @returns {(res: Request, res: Response) => Promise<any>}
 */
const handleErrors = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    logger.error(err);
    res
      .status(400)
      .json({ error: err.message || err.Message || err.toString() });
  }
};
const defautlMiddleware = (req, res, next) => next();
/**
 * Creates a middleware that extract listing parameters,
 * pass them to a listing function and return the result
 * as a json response
 * @param {(req: Request, res: Response) => any} listFn
 */
const getCollection = (listFn) => [
  requestMiddleware(joiSchema.request.get, 'params'),
  handleErrors(async (req, res) =>
    res.json(await listFn({ id: req.params.id, user: req.user }))
  ),
];
const updateCollection = (middleware = defautlMiddleware, listFn) => [
  requestMiddleware(joiSchema.request.update, 'params'),
  middleware,
  handleErrors(async (req, res) =>
    res.json(await listFn({ id: req.params.id, data: req.body, req }))
  ),
];

const profileCollection = (middleware = defautlMiddleware, listFn) => [
  requestMiddleware(joiSchema.user.all.user.reqUser),
  middleware,
  handleErrors(async (req, res) => res.json(await listFn(req))),
];

const deleteCollection = (listFn) => [
  requestMiddleware(joiSchema.request.delete, 'params'),
  handleErrors(async (req, res) =>
    res.json(await listFn({ id: req.params.id }))
  ),
];

const listCollection = (
  listFn,
  schema = joiSchema.request.list,
  queryType = 'query'
) => [
  requestMiddleware(schema, queryType),
  handleErrors(async ({ query: { offset, limit, ...others }, ...req }, res) => {
    res.json(
      await listFn({
        offset: Number(offset) || undefined,
        limit: Number(limit) || undefined,
        ...others,
        req,
      })
    );
  }),
];
const storeSignUpInfos = handleErrors((req, res, next) => {
  const { firstName, lastName, birthday, postalCode, centersOfInterest } =
    req.query;
  if (firstName || lastName || birthday || postalCode || centersOfInterest) {
    req.session.signUpInfos = {
      firstName,
      lastName,
      birthday,
      postalCode,
      centersOfInterest: Array.isArray(centersOfInterest)
        ? centersOfInterest
        : [centersOfInterest],
    };
  }
  next();
});
const consumeSignUpInfos = handleErrors(async (req, res, next) => {
  if (req.session.signUpInfos) {
    const { firstName, lastName, birthday, postalCode, centersOfInterest } =
      req.session.signUpInfos;
    const { user } = await UserModel.updateBySlug({
      slug: req.user.slug,
      firstName,
      lastName,
      dateOfBirth: birthday,
      postalCode,
      influencer: {
        centersOfInterest,
      },
    });
    req.user = user;
    res.user = user;
    delete req.session.signUpInfos;
  }
  next();
});

const authCheck = (roleName) =>
  handleErrors(({ user }, res, next) => {
    let message = null;

    if (!user) message = msg.notAuthorized;
    else if (!roleName || (roleName === '*' && !RoleList.includes(user.role))) {
      message = msg.wrongInfo('role');
    } else if (roleName !== '*') {
      if (roleName === Student) {
        if (!isStudent(user)) message = msg.wrongInfo('role');
      } else if (!RoleList.includes(roleName) || user.role !== roleName) {
        message = msg.wrongInfo('role');
      }
    }
    if (message) res.status(401).json({ authenticated: false, message });
    else next();
  });

module.exports = {
  handleErrors,
  listCollection,
  getCollection,
  storeSignUpInfos,
  consumeSignUpInfos,
  deleteCollection,
  updateCollection,
  profileCollection,
  authCheck,
};
