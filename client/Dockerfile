FROM node:16.4-alpine3.14 as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --silent
COPY . .
EXPOSE 3000
LABEL app.name="feedio-client"
CMD ["npm","start"]
