# frontend/Dockerfile

# Use an official Node runtime as a parent image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /usr/src/app


# Copy package.json and package-lock.json
COPY package*.json ./
 
# Install dependencies
RUN npm install
 
# Copy the rest of your application files
COPY . .
 
# Expose the port your app runs on
EXPOSE 3000
 
# Define the command to run your app
CMD ["npm", "start"]