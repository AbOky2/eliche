require('dotenv').config();

module.exports = {
  env: {
    URL_APP: process.env.URL_APP,
    PRODUCTION_URL_APP: process.env.PRODUCTION_URL_APP,
    STRIPE_TEST_PUBLISHABLEKEY: process.env.STRIPE_TEST_PUBLISHABLEKEY,
    STRIPE_LIVE_PUBLISHABLEKEY: process.env.STRIPE_LIVE_PUBLISHABLEKEY,
    GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });
    config.node = {
      fs: 'empty',
    };

    return config;
  },
};
