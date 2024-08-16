# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app
RUN apk add --no-cache build-base python3
COPY package.json package-lock.json ./
RUN npm ci --build-from-source
COPY . .

# Stage 2: Runtime
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app /app
RUN apk add --no-cache libstdc++  # Ensure necessary libraries are present
EXPOSE 3000
CMD [ "node", "index.js" ]
