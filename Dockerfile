# From https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

FROM node:20.18.0 AS base

FROM base as builder
# Building
WORKDIR /build
COPY . .
RUN npm install
RUN npm run build

FROM base as runner
WORKDIR /app
# Copy built standalone version.
# Note: This is missing /public 
# We need to check if public even exists before we can copy it!
COPY --from=builder /build/.next/standalone .
COPY --from=builder /build/.next/static ./.next/static

# Running
ENV NODE_ENV production
EXPOSE 3000
ENV PORT 3000

# Create mountable folder for local uploads.
RUN mkdir uploads
ENV PAYLOAD_UPLOADS_DIR ./uploads

# Create mountable folder for local database.
RUN mkdir db
ENV DATABASE_URI file:./db/database.db

# Payloadscret. For testing only.
ENV PAYLOAD_SECRET FOR_TESTING_ONLY

# Execute standalone compiled version.
CMD node server.js
