FROM node:20.20.2-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN DATABASE_URL=postgresql://localhost/dummy REDIS_URL=redis://localhost:6379 npm run build

EXPOSE 9000

CMD ["npx", "medusa", "start"]

