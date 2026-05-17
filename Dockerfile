FROM oven/bun:1.3.14 AS builder

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

ENV NODE_ENV=production
RUN bun run build


FROM oven/bun:1.3.14-distroless AS runner

WORKDIR /app

COPY --from=builder /app/.output ./.output
COPY --from=builder /app/drizzle ./drizzle

ENV NODE_ENV=production
ENV PORT=3000
ENV DATABASE_PATH=/app/data/db.sqlite

EXPOSE 3000

USER nonroot:nonroot

CMD ["./.output/server/index.mjs"]
