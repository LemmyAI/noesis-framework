# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install PostgreSQL
RUN apk add --no-cache postgresql postgresql-contrib

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY scripts ./scripts

# Create startup script
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'set -e' >> /app/start.sh && \
    echo '' >> /app/start.sh && \
    echo '# Start PostgreSQL' >> /app/start.sh && \
    echo 'mkdir -p /var/lib/postgresql/data' >> /app/start.sh && \
    echo 'chown -R postgres:postgres /var/lib/postgresql' >> /app/start.sh && \
    echo 'su postgres -c "initdb -D /var/lib/postgresql/data 2>/dev/null || true"' >> /app/start.sh && \
    echo 'su postgres -c "pg_ctl -D /var/lib/postgresql/data -l /var/log/postgresql.log start"' >> /app/start.sh && \
    echo '' >> /app/start.sh && \
    echo '# Create database and user' >> /app/start.sh && \
    echo 'su postgres -c "psql -c \"CREATE USER noesis WITH PASSWORD '\''noesis'\'';\" 2>/dev/null || true"' >> /app/start.sh && \
    echo 'su postgres -c "psql -c \"CREATE DATABASE noesis OWNER noesis;\" 2>/dev/null || true"' >> /app/start.sh && \
    echo 'su postgres -c "psql -c \"GRANT ALL PRIVILEGES ON DATABASE noesis TO noesis;\""' >> /app/start.sh && \
    echo '' >> /app/start.sh && \
    echo '# Wait for PostgreSQL to be ready' >> /app/start.sh && \
    echo 'sleep 2' >> /app/start.sh && \
    echo '' >> /app/start.sh && \
    echo '# Initialize database schema' >> /app/start.sh && \
    echo 'DATABASE_URL="postgresql://noesis:noesis@localhost:5432/noesis" node scripts/init-db.js' >> /app/start.sh && \
    echo '' >> /app/start.sh && \
    echo '# Start API' >> /app/start.sh && \
    echo 'DATABASE_URL="postgresql://noesis:noesis@localhost:5432/noesis" node dist/index.js' >> /app/start.sh && \
    chmod +x /app/start.sh

EXPOSE 3000

CMD ["/app/start.sh"]
