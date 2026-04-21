FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 9000

# Cambiamos a develop porque es el único modo que lee el .ts directamente y funciona en tu PC
CMD ["npx", "medusa", "develop"]
