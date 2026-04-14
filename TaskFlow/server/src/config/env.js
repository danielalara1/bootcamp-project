require('dotenv').config();

const config = {
  port: process.env.PORT
};


if (!config.port) {
  throw new Error('FATAL: El puerto (PORT) no está definido en el archivo .env');
}

module.exports = config;