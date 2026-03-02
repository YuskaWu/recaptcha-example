# $BUILDPLATFORM is special build argument, see:
# https://docs.docker.com/build/building/multi-platform/#cross-compilation
FROM --platform=$BUILDPLATFORM node:24-alpine
ARG TARGETPLATFORM
ARG BUILDPLATFORM
RUN echo "I am running on $BUILDPLATFORM, building for $TARGETPLATFORM" > /log

WORKDIR /app
RUN npm install -g pnpm@10.2.1

# seperate copy command for cache porpose
COPY ./package*.json .
COPY ./pnpm-lock.yaml .
RUN pnpm install