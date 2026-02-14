#!/bin/sh
set -e

echo "=== NOESIS API Starting ==="

# Initialize directories with proper ownership
mkdir -p /var/lib/postgresql/data /run/postgresql
touch /var/log/postgresql.log
chown -R postgres:postgres /var/lib/postgresql /run/postgresql /var/log/postgresql.log

# Init database cluster if needed
su postgres -c "initdb -D /var/lib/postgresql/data 2>/dev/null || true"

# Configure PostgreSQL for local connections
echo "local all all trust" > /var/lib/postgresql/data/pg_hba.conf
echo "host all all 127.0.0.1/32 trust" >> /var/lib/postgresql/data/pg_hba.conf
chown postgres:postgres /var/lib/postgresql/data/pg_hba.conf

# Start PostgreSQL
su postgres -c "pg_ctl -D /var/lib/postgresql/data -l /var/log/postgresql.log start -w -t 30"

# Create database and user
su postgres -c "psql -c \"CREATE USER noesis WITH PASSWORD 'noesis';\" 2>/dev/null || true"
su postgres -c "psql -c \"CREATE DATABASE noesis OWNER noesis;\" 2>/dev/null || true"
su postgres -c "psql -c \"GRANT ALL PRIVILEGES ON DATABASE noesis TO noesis;\""
su postgres -c "psql -d noesis -c \"GRANT ALL ON SCHEMA public TO noesis;\""

echo "PostgreSQL ready."

# Initialize and seed database
DATABASE_URL="postgresql://noesis:noesis@localhost:5432/noesis" node scripts/init-db.js

echo "Starting NOESIS API on port ${PORT:-3000}..."

# Start API
exec DATABASE_URL="postgresql://noesis:noesis@localhost:5432/noesis" node dist/index.js
