# ── Stage 1: Build the React frontend ────────────────────────────
FROM node:20-alpine AS frontend-build

WORKDIR /app/frontend

COPY fifa-2026-app/frontend/package.json fifa-2026-app/frontend/package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY fifa-2026-app/frontend/ ./

ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY

ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

RUN npm run build

# ── Stage 2: Production Node.js server ──────────────────────────
FROM node:20-alpine AS production

WORKDIR /app

COPY fifa-2026-app/backend/package.json fifa-2026-app/backend/package-lock.json ./
RUN npm ci --omit=dev

COPY fifa-2026-app/backend/ ./
COPY --from=frontend-build /app/frontend/dist ./public

ENV NODE_ENV=production

EXPOSE 10000

CMD ["node", "server.js"]
