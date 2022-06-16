const { Strategy: FacebookStrategy } = require('passport-facebook');
const passport = require('passport');
const FB = require('fb');
const {
  storeSignUpInfos,
  consumeSignUpInfos,
} = require('../middleware/express');

const User = require('../models/User');
const { UserModel } = require('../models');
// const { redirecAfterAuth } = require('./index');

function auth({ ROOT_URL, server }) {
  const uri = '/auth/facebook/oauth2callback';
  const redirectUri = ROOT_URL + uri;
  const verify = async (accessToken, refreshToken, profile, verified) => {
    const fbUser = FB.extend({
      accessToken,
      appId: '487070945537857', //process.env.FACEBOOK_CLIENT_ID,
      appSecret: 'e52f683d83dc4841a2a002edc7ebdd14', //process.env.FACEBOOK_CLIENT_SECRET,
      version: 'v3.2',
    });
    const userFb = await fbUser.api(
      'me?fields=id,address,birthday,email,first_name,last_name,languages,picture,gender,accounts{fan_count}'
    );
    // if (!userFb.accounts || userFb.accounts.data.length === 0) {
    //   return verified(new Error('You need to link a page.'));
    // }
    // console.log(
    //   'FAN_COUNT:',
    //   userFb.accounts.data.sort((a, b) => a.fan_count - b.fan_count)[0]
    // );

    const { id, provider } = profile;
    const {
      id: socialUserId,
      email,
      first_name: firstName,
      last_name: lastName,
    } = userFb;

    try {
      const user = await User.signInOrSignUpViaSocialMedia({
        provider,
        socialUserId,
        firstName,
        lastName,
        email,
        token: { accessToken, refreshToken },
      });
      verified(null, user);
    } catch (err) {
      verified(err);
      console.log(err); // eslint-disable-line
    }
  };

  // passport.serializeUser((user, done) => done(null, user._id));
  // passport.deserializeUser(async (id, done) => {
  //   try {
  //     const user = await UserModel.getById(id);

  //     done(null, user);
  //   } catch (err) {
  //     done(err);
  //   }
  // });

  passport.use(
    new FacebookStrategy(
      {
        clientID: '487070945537857', //process.env.FACEBOOK_CLIENT_ID,
        clientSecret: 'e52f683d83dc4841a2a002edc7ebdd14', //process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: redirectUri,
        scope: [
          'email',
          'public_profile',
          'pages_show_list',
          'user_gender',
          'user_birthday',
        ],
        state: true,
      },
      verify
    )
  );

  // server.use(passport.initialize());
  // server.use(passport.session());

  // server.post('/auth/facebook', async (req, res) => {
  //   const { token } = req.body;

  //   console.log('TOKEN: ', token);
  //   const fbUser = FB.extend({
  //     accessToken: token,
  //     appId: '487070945537857', //process.env.FACEBOOK_CLIENT_ID,
  //     appSecret: 'e52f683d83dc4841a2a002edc7ebdd14', //process.env.FACEBOOK_CLIENT_SECRET,
  //     version: 'v3.2',
  //   });
  //   const userFb = await fbUser.api(
  //     'me?fields=id,address,birthday,email,first_name,last_name,languages,picture,gender,accounts{fan_count}'
  //   );

  //   console.log('DATA', JSON.stringify(userFb));

  //   const { id: socialUserId, email, first_name, last_name } = userFb;

  //   const user = await UserModel.signInOrSignUpViaSocialMedia({
  //     provider: 'facebook',
  //     email,
  //     // token: { accessToken, refreshToken },
  //     firstName: first_name,
  //     lastName: last_name,
  //   });
  //   res.status(201);
  //   res.json({ user });
  // });

  server.get(
    '/auth/facebook',
    storeSignUpInfos,
    passport.authenticate('facebook', { failureRedirect: '/login' })
    // function (req, res) {
    //   console.log('req: ', req);
    // }
  );

  server.get(
    uri,
    consumeSignUpInfos,
    passport.authenticate('facebook', {
      // successRedirect: '/',
      failureRedirect: '/login',
    }),
    (req, res) => {
      res.send('<script>history.go(-2)</script > ');
      // res.redirect('/');
    }
  );
}

module.exports = auth;
