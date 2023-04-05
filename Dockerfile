# Start with a Node.js image for building the frontend
FROM node:latest AS client

# Set the working directory to /app
WORKDIR /DMXProject

# Copy the package.json and yarn.lock files
COPY client/package.json ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the frontend source code
COPY client .

# Build the frontend
RUN yarn build

# Use a Rust image for building the backend
FROM rust:latest AS server

# Set the working directory to /app
WORKDIR /DMXProject

# Copy the Cargo.toml and Cargo.lock files
COPY server/Cargo.toml server/Cargo.lock ./

# Build the dependencies, but do not compile the source code yet
RUN mkdir src && echo "fn main() {}" > src/main.rs \
    && cargo build --release

# Copy the backend source code
COPY server .

# Build the backend
RUN cargo build --release

# Create a new image with both the frontend and backend built
FROM debian:latest

# Set the working directory to /app
WORKDIR /DMXProject

# Copy the built frontend and backend
COPY --from=client /DMXProject/out client/out
COPY --from=server /DMXProject/target/release/dmxserver .

# Set the environment variables for the backend
ENV RUST_LOG=actix_web=info \
    SERVER_HOST=0.0.0.0 \
    SERVER_PORT=8080

# Expose the port used by the backend
EXPOSE 8080

# Start the backend server
CMD ["./server"]