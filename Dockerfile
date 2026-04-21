FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build && cp dist/medusa-config.js medusa-config.js || true

EXPOSE 9000

CMD ["npm", "start"]
