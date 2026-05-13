-- 003_add_soft_delete_columns.sql
-- Adds Sprint 1 soft-delete and audit columns.
-- Rule: no hard deletes in app logic; use record_status = 'INACTIVE'.

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

-- Optional only if your instructor asks priceHist to also have soft-delete visibility.
-- ALTER TABLE priceHist
-- ADD COLUMN IF NOT EXISTS record_status VARCHAR(10) DEFAULT 'ACTIVE'
-- CHECK (record_status IN ('ACTIVE', 'INACTIVE'));
