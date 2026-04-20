FROM node:20.20.2-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --legacy-peer-deps --omit=dev

COPY . .

RUN npm run build

EXPOSE 9000

FROM node:20.20.2-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --legacy-peer-deps --omit=dev

COPY . .

RUN npm run build

EXPOSE 9000

CMD ["npm", "run", "start"]

