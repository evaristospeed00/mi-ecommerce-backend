import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      port: 3000,
      storeCors: process.env.STORE_CORS || "http://localhost:8000",
      adminCors: process.env.ADMIN_CORS || "http://localhost:7001",
      authCors: process.env.AUTH_CORS || "http://localhost:7001,http://localhost:8000",
      jwtSecret: process.env.MEDUSA_SECRET || process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  modules: [
    {
      resolve: "@medusajs/medusa/auth",
    },
    {
      resolve: "@medusajs/medusa/cache-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/medusa/event-bus-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/medusa/workflow-engine-redis",
      options: {
        redis: {
          url: process.env.REDIS_URL,
        },
      },
    },
    {
      resolve: "@medusajs/medusa/cart",
    },
    {
      resolve: "@medusajs/medusa/customer",
    },
    {
      resolve: "@medusajs/medusa/order",
    },
    {
      resolve: "@medusajs/medusa/product",
    },
    {
      resolve: "@medusajs/medusa/inventory",
    },
    {
      resolve: "@medusajs/medusa/stock-location",
    },
    {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          ...(process.env.STRIPE_API_KEY
            ? [
                {
                  resolve: "@medusajs/medusa/payment-stripe",
                  id: "stripe",
                  options: {
                    apiKey: process.env.STRIPE_API_KEY,
                    ...(process.env.STRIPE_WEBHOOK_SECRET
                      ? { webhookSecret: process.env.STRIPE_WEBHOOK_SECRET }
                      : {}),
                  },
                },
              ]
            : []),
        ],
      },
    },
  ],
})
