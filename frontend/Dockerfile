FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
# Step 2: Use Nginx to serve the built files
FROM nginx:alpine
# Copy built React app to Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config (optional)
# Uncomment if you have nginx.conf in your project
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (default for Nginx)
EXPOSE 80
# Start Nginx to serve the frontend
CMD ["nginx", "-g", "daemon off;"]