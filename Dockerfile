# Use a Node.js base image
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm i

# Copy source code
COPY . .

# Build the Vite application
RUN npm run build

# Production image using a lightweight web server
FROM nginx:alpine AS runner

# Copy built application from the base stage
COPY --from=base /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
