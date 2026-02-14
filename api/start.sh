#!/bin/sh
set -e

echo "=== NOESIS API Starting ==="

PGDATA="/tmp/pgdata"
PGLOG="/tmp/postgresql.log"

# Clean slate for PostgreSQL
rm -rf "$PGDATA"
mkdir -p "$PGDATA" /run/postgresql
chown -R postgres:postgres "$PGDATA" /run/postgresql

# Init database cluster
su postgres -c "initdb -D $PGDATA"

# Configure PostgreSQL
cat > "$PGDATA/pg_hba.conf" <<HBAEOF
local all all trust
host all all 127.0.0.1/32 trust
host all all ::1/128 trust
HBAEOF
chown postgres:postgres "$PGDATA/pg_hba.conf"

# Tune for low memory (Render free = 512MB shared with Node)
cat >> "$PGDATA/postgresql.conf" <<PGEOF
shared_buffers = 32MB
work_mem = 4MB
maintenance_work_mem = 16MB
effective_cache_size = 64MB
max_connections = 20
listen_addresses = 'localhost'
port = 5432
PGEOF

# Start PostgreSQL
su postgres -c "pg_ctl -D $PGDATA -l $PGLOG start -w -t 60"

echo "PostgreSQL started. Checking..."
su postgres -c "pg_isready" || { echo "PG not ready!"; cat "$PGLOG"; exit 1; }

# Create database and user
su postgres -c "psql -c \"CREATE USER noesis WITH PASSWORD 'noesis';\""
su postgres -c "psql -c \"CREATE DATABASE noesis OWNER noesis;\""
su postgres -c "psql -c \"GRANT ALL PRIVILEGES ON DATABASE noesis TO noesis;\""
su postgres -c "psql -d noesis -c \"GRANT ALL ON SCHEMA public TO noesis;\""

echo "PostgreSQL ready. Seeding database..."

# Set database URL for all subsequent commands
export DATABASE_URL="postgresql://noesis:noesis@localhost:5432/noesis"

# Initialize and seed database
node scripts/init-db.js

echo "Starting NOESIS API on port ${PORT:-3000}..."

# Start API (exec replaces shell)
exec node dist/index.js
