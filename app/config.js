// const dotenv = require('dotenv');

// dotenv.config();

// const {
//   JWT_SECRET,
//   NODE_ENV,
//   MONGO_URL_TEST,
//   MONGO_URL_PROD,
//   GOOGLE_CLIENT_SECRET,
//   GOOGLE_CLIENT_ID,
//   SESSION_NAME,
//   COOKIE_DOMAIN,
//   TWILIO_ACCOUNT_SID,
//   TWILIO_TOKEN,
//   GOOGLE_GEOLOCATION,
//   NEXT_PUBLIC_UPLOAD_URL,
//   NEXT_PUBLIC_ROOT_URL,
//   NEXT_PUCLIC_GOOGLE_MAPS_KEY,
//   MAIL_USER,
//   SENDGRID_API_KEY,
// } = process.env;

const NEXT_PUBLIC_ROOT_URL = 'http://212.47.235.69:3000';
const NEXT_PUBLIC_UPLOAD_URL = 'http://212.47.235.69:3001';
const NODE_ENV = 'dev';
const MONGO_URL_TEST =
  'mongodb+srv://dbtest:dbtest@cluster0.h9mof.mongodb.net/?retryWrites=true&w=majority';
const GOOGLE_CLIENT_ID =
  '667557981280-0guq4m234dku0huhquhb48h1biel89uf.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '_6usf8BxG55vvdv87yWS1jMz';
const COOKIE_DOMAIN = '';
const JWT_SECRET = 'sdfdsfdsf';
const SESSION_NAME = 'kit-le-nidjsdlf';
const SESSION_SECRET = 'sdfdsfdsf';
const TWILIO_ACCOUNT_SID = 'ACdd61788323069b521345a6953cfad067';
const TWILIO_TOKEN = '8a0374e582c59aeee464948806f219e6';
const GOOGLE_GEOLOCATION = 'AIzaSyC59sI-cU0pmzMBVVtxBAcJeokj0S8ra3s';
const GOOGLE_MAIL_CLIENT =
  '656438582073-00mkt4k7jl2b9vhls2gj0qh328jo4ro7.apps.googleusercontent.com';
const GOOGLE_MAIL_SECRET = '3mfZIVaa05Q5UBMo3yCqLnp3';
const NEXT_PUCLIC_GOOGLE_MAPS_KEY = 'AIzaSyD7NrR47b_NReW4PF6kCDd1vGSUrm9xkzo';
const SENDGRID_API_KEY =
  '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';
const MAIL_USER = 'kitlenid@gmail.com';

const PORT = process.env.PORT || 3000;
const ROOT_URL = process.env.ROOT_URL || `http://212.47.235.69:${PORT}`;
// const SESSION_SECRET =
//   process.env.SESSION_SECRET || 'M87kjdsfs876d98hdshhfjsecret';
const dev = NODE_ENV !== 'production';
const MONGO_URL = dev ? MONGO_URL_TEST : MONGO_URL_PROD;

module.exports = {
  PORT,
  ROOT_URL,
  NEXT_PUBLIC_PORT: PORT,
  MONGO_URL,
  JWT_SECRET,
  dev,
  SESSION_NAME,
  SESSION_SECRET,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  COOKIE_DOMAIN,
  TWILIO_ACCOUNT_SID,
  TWILIO_TOKEN,
  GOOGLE_GEOLOCATION,
  NEXT_PUBLIC_UPLOAD_URL,
  NEXT_PUBLIC_ROOT_URL,
  NEXT_PUCLIC_GOOGLE_MAPS_KEY,
  MAIL_USER,
  SENDGRID_API_KEY,
};
