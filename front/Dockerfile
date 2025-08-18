FROM node:18-alpine

WORKDIR /app

# Set up pnpm properly
ENV PNPM_HOME=/usr/local/bin
RUN npm install -g pnpm

# Copy package files and install dependencies
COPY package*.json ./
RUN pnpm install

# Install expo-cli globally
RUN pnpm install -g expo-cli

# Copy project files
COPY . .

# Expose ports
EXPOSE 8081 19000 19001 19002

# Start Expo using lan mode
CMD ["pnpm" , "start" ,"--port" ,"19000"]