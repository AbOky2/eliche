const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const {
  NODE_ENV,
  MONGO_URL_TEST,
  MONGO_URL_PROD,
  GOOGLE_GEOLOCATION,
  FTP_HOST,
  FTP_USER,
  FTP_PASSWORD,
  HERE_API_KEY,
  GOOGLE_CLIENT_ID,
} = process.env;

const PORT = process.env.PORT || 3001;
const ROOT_URL = process.env.ROOT_URL || `http://212.47.235.69:${PORT}`;
const IS_DEV = NODE_ENV !== 'production';
const MONGO_URL = IS_DEV ? MONGO_URL_TEST : MONGO_URL_PROD;
const PROPERTIES_DIR = 'properties';
const PUBLIC_PROPERTIES_DIR = path.resolve(
  __dirname,
  `./public/${PROPERTIES_DIR}`
);
module.exports = {
  PORT,
  ROOT_URL,
  MONGO_URL,
  IS_DEV,
  GOOGLE_GEOLOCATION,
  FTP_HOST,
  FTP_USER,
  FTP_PASSWORD,
  PROPERTIES_DIR,
  PUBLIC_PROPERTIES_DIR,
  HERE_API_KEY,
  GOOGLE_CLIENT_ID,
};
