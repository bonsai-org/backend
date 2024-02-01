FROM node:21.5.0

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

COPY . .

CMD ["npm", "run", "dev"]

EXPOSE 3000