FROM node:20.16.0

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
ENV MONGO_DB_STRING="mongodb://mongo-container:27017/bonsai-dev-database"
ENV PORT=3000
ENV NODE_ENV="dev"
COPY . ./
RUN npm install --silent
RUN npx tsc

CMD ["node", "./dist/bin/main.js"]

EXPOSE 3000