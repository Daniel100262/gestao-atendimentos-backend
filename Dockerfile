# Use Node.js LTS base image for stability
FROM node:22-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm ci --omit=dev

RUN npm install -g @nestjs/cli

# Copy source files
COPY . .

# Build the app
RUN npm run build

# Set environment to production
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["node", "dist/main"]
