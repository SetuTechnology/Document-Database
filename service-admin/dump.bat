@echo off
echo "Creating database backup"
mongodump --db documents-database
echo "Database backup created"
