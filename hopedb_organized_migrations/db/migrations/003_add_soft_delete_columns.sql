-- db/migrations/003_add_soft_delete_columns.sql
-- Adds soft-delete and audit columns required by the project guide.
-- Run this after 001_initial_hopedb_schema.sql and 002_rights_schema.sql.

ALTER TABLE product
ADD COLUMN IF NOT EXISTS record_status VARCHAR(10) DEFAULT 'ACTIVE'
CHECK (record_status IN ('ACTIVE', 'INACTIVE'));

ALTER TABLE product
ADD COLUMN IF NOT EXISTS stamp VARCHAR(60);

UPDATE product
SET record_status = 'ACTIVE'
WHERE record_status IS NULL;

ALTER TABLE priceHist
ADD COLUMN IF NOT EXISTS stamp VARCHAR(60);

ALTER TABLE priceHist
ADD COLUMN IF NOT EXISTS record_status VARCHAR(10) DEFAULT 'ACTIVE'
CHECK (record_status IN ('ACTIVE', 'INACTIVE'));

UPDATE priceHist
SET record_status = 'ACTIVE'
WHERE record_status IS NULL;
