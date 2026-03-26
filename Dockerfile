FROM oven/bun:1.3.11 AS builder

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

ENV NODE_ENV=production
RUN bun run build


FROM oven/bun:1.3.11-distroless AS runner

WORKDIR /app

COPY --from=builder /app/.output ./.output

ENV NODE_ENV=production
ENV PORT=3000
ENV MAPPING_FILE=/app/mapping.yaml

VOLUME ${MAPPING_FILE}

EXPOSE 3000

USER nonroot:nonroot

CMD ["./.output/server/index.mjs"]
