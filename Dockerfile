FROM node:20.16.0 AS base
WORKDIR /app
COPY . . 
RUN npm install
CMD ["npm", "run", "build-and-run"]
EXPOSE 3000