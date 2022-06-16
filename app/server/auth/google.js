const passport = require('passport');
const Strategy = require('passport-google-oauth').OAuth2Strategy;
const { google } = require('googleapis');

const { UserModel } = require('../models');
// const { redirecAfterAuth } = require('./index');
const {
  storeSignUpInfos,
  consumeSignUpInfos,
} = require('../middleware/express');

function auth({ ROOT_URL, server }) {
  const verify = async (accessToken, refreshToken, profile, verified) => {
    let email;
    let avatarUrl;
    let firstName;
    let lastName;

    /* TESTING YOUTUBE */
    // const oauth2Client = new google.auth.OAuth2(
    //   process.env.Google_clientId,
    //   process.env.Google_clientSecret
    // );

    // oauth2Client.setCredentials({
    //   access_token: accessToken,
    //   refresh_token: refreshToken,
    // });
    // const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
    // const stats = await youtube.channels.list({
    //   part: 'statistics',
    //   mine: true,
    // });
    // console.log(stats.data.items);
    /* END TESTING YOUTUBE */

    if (profile.emails) {
      email = profile.emails[0].value;
    }

    if (profile.photos && profile.photos.length > 0) {
      avatarUrl = profile.photos[0].value.replace('sz=50', 'sz=128');
    }
    if (profile.name && profile.name.familyName) {
      lastName = profile.name.familyName;
    } else {
      lastName = profile.displayName;
    }
    if (profile.name && profile.name.givenName) {
      firstName = profile.name.givenName;
    } else {
      firstName = profile.displayName;
    }
    try {
      const user = await UserModel.signInOrSignUpViaSocialMedia({
        provider: profile.provider,
        socialUserId: profile.id,
        email,
        token: { accessToken, refreshToken },
        firstName,
        lastName,
        avatarUrl,
      });
      verified(null, user);
    } catch (err) {
      verified(err);
      console.log('Error catch: ', err); // eslint-disable-line
    }
  };

  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserModel.getById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
  console.log(process.env.GOOGLE_CLIENT_ID);
  passport.use(
    new Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${ROOT_URL}/oauth2callback`,
      },
      verify
    )
  );

  server.use(passport.initialize());
  server.use(passport.session());

  server.get(
    '/auth/google',
    storeSignUpInfos,
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  server.get(
    '/oauth2callback',
    passport.authenticate('google', {
      // successRedirect: '/auth/google/success',
      failureRedirect: '/login',
    }),
    consumeSignUpInfos,
    // redirecAfterAuth
    (req, res) => {
      res.send('<script>history.go(-2)</script > ');
      // res.redirect('/');
    }
  );
}

module.exports = auth;
