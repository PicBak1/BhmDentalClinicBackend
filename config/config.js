require('dotenv').config();

const defaultConfig = {
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'bhm_dental_clinic',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 5432),
  dialect: 'postgres'
};

module.exports = {
  development: defaultConfig,
  test: {
    ...defaultConfig,
    database: process.env.DB_TEST_NAME || 'bhm_dental_clinic_test'
  },
  production: {
    ...defaultConfig,
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
  }
};