# First stage, build
FROM node:19.7.0-alpine as build-stage0

# Set the workdir
WORKDIR /app

# Copy the required files to let the vite build it properly
COPY tsconfig.json package.json ./
COPY public/ ./public/
COPY src/ ./src/

# Install all packages and build the project
RUN npm install && npm run build

# Start the main image stage
FROM node:19.7.0-alpine as publish-stage

# Define in the next stage the workdir
WORKDIR /app

# Copy the necessary files
COPY --from=build-stage0 /app/build ./

# Install serve package
RUN npm install --no-cache -g serve

# Create an argument for server url
ARG SERVER_URL=http://localhost:46000
ENV SERVER_URL=$SERVER_URL

# Expose application port
EXPOSE 46001

# Define the starter point
CMD ["serve", ".", "-p", "46001"]