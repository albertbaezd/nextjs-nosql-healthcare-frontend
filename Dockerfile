# Stage 1: Build
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port
EXPOSE 3000

# Build the application
CMD ["npm", "run", "dev"]

# # Stage 2: Production Image
# FROM node:18 AS runner

# # Set NODE_ENV to production
# ENV NODE_ENV=production

# # Set working directory
# WORKDIR /app

# # Copy only necessary files from the builder stage
# COPY --from=builder /app/package.json ./
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/node_modules ./node_modules

# # Expose port
# EXPOSE 3000

# # Start the application
# CMD ["npm", "start"]