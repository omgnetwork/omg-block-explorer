FROM node:10-alpine
COPY . /app
WORKDIR /app
RUN npm install && npm run build
CMD NODE_ENV=production node ./server
