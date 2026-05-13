-- db/migrations/004_seed_superadmin.sql
-- Seed SUPERADMIN account and give all modules/rights.
-- Run this after:
-- 001_initial_hopedb_schema.sql
-- 002_rights_schema.sql
-- 003_add_soft_delete_columns.sql

-- NOTE:
-- This version uses lowercase table/column names because your Supabase table
-- showed lowercase names like usermodule_rights.

-- 1. Seed SUPERADMIN user
INSERT INTO "user" (userid, username, lastname, firstname, user_type, record_status, stamp)
VALUES (
  'user1',
  'Jerry',
  'Jeremias',
  'Esperanza',
  'SUPERADMIN',
  'ACTIVE',
  'ACTIVATED USER1 2025-10-20 10:42'
)
ON CONFLICT (userid) DO UPDATE SET
  username = EXCLUDED.username,
  lastname = EXCLUDED.lastname,
  firstname = EXCLUDED.firstname,
  user_type = EXCLUDED.user_type,
  record_status = EXCLUDED.record_status,
  stamp = EXCLUDED.stamp;

-- 2. Make sure modules exist
INSERT INTO module (module_id, description, record_status, stamp)
VALUES
  ('Prod_Mod', 'Product Module', 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:42'),
  ('Report_Mod', 'Report Module', 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:42'),
  ('Adm_Mod', 'Admin Module', 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:42')
ON CONFLICT (module_id) DO UPDATE SET
  description = EXCLUDED.description,
  record_status = EXCLUDED.record_status,
  stamp = EXCLUDED.stamp;

-- 3. Give SUPERADMIN all module access
INSERT INTO user_module (userid, module_id, rights_value, record_status, stamp)
VALUES
  ('user1', 'Prod_Mod', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:56'),
  ('user1', 'Report_Mod', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:56'),
  ('user1', 'Adm_Mod', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:56')
ON CONFLICT (userid, module_id) DO UPDATE SET
  rights_value = EXCLUDED.rights_value,
  record_status = EXCLUDED.record_status,
  stamp = EXCLUDED.stamp;

-- 4. Make sure rights exist
INSERT INTO rights (right_id, description, right_value, module_id, record_status, stamp)
VALUES
  ('PRD_DEL', 'Product Deletion', 1, 'Prod_Mod', 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
  ('PRD_EDIT', 'Product Edit', 1, 'Prod_Mod', 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
  ('PRD_ADD', 'Product Insertion', 1, 'Prod_Mod', 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
  ('REP_001', 'Product Report Listing', 1, 'Report_Mod', 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
  ('REP_002', 'Product Top Selling', 1, 'Report_Mod', 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
  ('ADM_USER', 'Admin Activate User', 1, 'Adm_Mod', 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00')
ON CONFLICT (right_id) DO UPDATE SET
  description = EXCLUDED.description,
  right_value = EXCLUDED.right_value,
  module_id = EXCLUDED.module_id,
  record_status = EXCLUDED.record_status,
  stamp = EXCLUDED.stamp;

-- 5. Fix wrong/incomplete usermodule_rights table.
-- Your screenshot showed only id and created_at, so this recreates it correctly.
DROP TABLE IF EXISTS usermodule_rights CASCADE;

CREATE TABLE usermodule_rights (
  userid VARCHAR(30) NOT NULL,
  right_id VARCHAR(30) NOT NULL,
  right_value INT NOT NULL CHECK (right_value IN (0, 1)),
  record_status VARCHAR(10) NOT NULL CHECK (record_status IN ('ACTIVE', 'INACTIVE')),
  stamp VARCHAR(60),
  PRIMARY KEY (userid, right_id),
  FOREIGN KEY (userid) REFERENCES "user"(userid),
  FOREIGN KEY (right_id) REFERENCES rights(right_id)
);

-- 6. Give SUPERADMIN all rights
INSERT INTO usermodule_rights (userid, right_id, right_value, record_status, stamp)
VALUES
  ('user1', 'PRD_DEL', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
  ('user1', 'PRD_EDIT', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
  ('user1', 'PRD_ADD', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
  ('user1', 'REP_001', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
  ('user1', 'REP_002', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
  ('user1', 'ADM_USER', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00')
ON CONFLICT (userid, right_id) DO UPDATE SET
  right_value = EXCLUDED.right_value,
  record_status = EXCLUDED.record_status,
  stamp = EXCLUDED.stamp;

-- 7. Verify
SELECT * FROM "user" WHERE userid = 'user1';
SELECT * FROM user_module WHERE userid = 'user1';
SELECT * FROM usermodule_rights WHERE userid = 'user1';
