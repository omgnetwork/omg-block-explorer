FROM node:10-alpine

COPY . /app
WORKDIR /app
RUN npm install
CMD npm run build && npm run start
