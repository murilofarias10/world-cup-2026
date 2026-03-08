# ─── Stage 1: Build ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# ─── Stage 2: Serve ──────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our nginx template (uses $PORT injected by Render at runtime)
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# Copy the static build output from Stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Render sets $PORT (default 10000). We use envsubst to write the final config.
EXPOSE 10000

CMD ["/bin/sh", "-c", \
  "envsubst '$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
