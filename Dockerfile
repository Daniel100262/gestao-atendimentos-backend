# Use Node.js LTS base image for stability
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev
RUN npm install -g @nestjs/cli
COPY . .
RUN npm run build

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/main"]
