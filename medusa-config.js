const dotenv = require("dotenv");
dotenv.config();

const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";
const DATABASE_URL = process.env.DATABASE_URL || "postgres://localhost/medusa-store";
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: "@medusajs/file-local",
    options: { upload_dir: "uploads" },
  },
  {
    resolve: "@medusajs/admin",
    options: {
      autoRebuild: true,
      develop: { open: process.env.OPEN_BROWSER !== "false" },
    },
  },
];

module.exports = {
  projectConfig: {
    jwtSecret: process.env.JWT_SECRET || "supersecret",
    cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    store_cors: STORE_CORS,
    database_url: DATABASE_URL,
    admin_cors: ADMIN_CORS,
    redis_url: REDIS_URL,
  },
  plugins,
};
