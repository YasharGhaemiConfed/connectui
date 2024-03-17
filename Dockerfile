# Use official Node.js image as base
FROM node:latest as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build React app
RUN npm run build

# Use nginx for serving React app
FROM nginx:latest

# Copy built React app to nginx public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
