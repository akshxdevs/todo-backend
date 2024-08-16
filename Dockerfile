FROM node:alpine3.18
RUN apk add --no-cache build-base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD [ "node", "index.js" ]

