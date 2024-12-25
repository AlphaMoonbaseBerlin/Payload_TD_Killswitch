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
# Note: This is missing /public and .next/static
COPY --from=builder /build/.next/standalone .
COPY --from=builder /build/.next/static ./.next/static
# Running
ENV NODE_ENV production
EXPOSE 3000
ENV PORT 3000
RUN mkdir db

ENV DATABASE_URI file:./db/database.db
ENV PAYLOAD_SECRET FOR_TESTING_ONLY

#RUN cat package.json
CMD node server.js
