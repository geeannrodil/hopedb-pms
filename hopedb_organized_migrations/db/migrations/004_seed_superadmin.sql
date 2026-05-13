-- db/migrations/004_seed_superadmin.sql
-- Seeds the SUPERADMIN account and gives all modules/rights.
-- Run this after:
-- 001_initial_hopedb_schema.sql
-- 002_rights_schema.sql
-- 003_add_soft_delete_columns.sql

-- 1. Seed SUPERADMIN user
INSERT INTO users (userId, username, lastName, firstName, user_type, record_status, stamp)
VALUES (
  'user1',
  'Jerry',
  'Jeremias',
  'Esperanza',
  'SUPERADMIN',
  'ACTIVE',
  'ACTIVATED USER1 2025-10-20 10:42'
)
ON CONFLICT (userId) DO UPDATE SET
  username = EXCLUDED.username,
  lastName = EXCLUDED.lastName,
  firstName = EXCLUDED.firstName,
  user_type = EXCLUDED.user_type,
  record_status = EXCLUDED.record_status,
  stamp = EXCLUDED.stamp;

-- 2. Make sure modules exist
INSERT INTO module (Module_ID, DESCRIPTION, Record_status, Stamp)
VALUES
  ('Prod_Mod', 'Product Module', 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:42'),
  ('Report_Mod', 'Report Module', 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:42'),
  ('Adm_Mod', 'Admin Module', 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:42')
ON CONFLICT (Module_ID) DO UPDATE SET
  DESCRIPTION = EXCLUDED.DESCRIPTION,
  Record_status = EXCLUDED.Record_status,
  Stamp = EXCLUDED.Stamp;

-- 3. Give SUPERADMIN all module access
INSERT INTO user_module (userid, Module_ID, rights_value, record_status, stamp)
VALUES
  ('user1', 'Prod_Mod', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:56'),
  ('user1', 'Report_Mod', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:56'),
  ('user1', 'Adm_Mod', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:56')
ON CONFLICT (userid, Module_ID) DO UPDATE SET
  rights_value = EXCLUDED.rights_value,
  record_status = EXCLUDED.record_status,
  stamp = EXCLUDED.stamp;

-- 4. Make sure rights exist
INSERT INTO rights (Right_ID, Description, Right_value, Module_ID, Record_status, Stamp)
VALUES
  ('PRD_DEL', 'Product Deletion', 0, 'Prod_Mod', 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
  ('PRD_EDIT', 'Product Edit', 1, 'Prod_Mod', 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
  ('PRD_ADD', 'Product Insertion', 1, 'Prod_Mod', 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
  ('REP_001', 'Product Report Listing', 1, 'Report_Mod', 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
  ('REP_002', 'Product Top Selling', 0, 'Report_Mod', 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
  ('ADM_USER', 'Admin Activate User', 1, 'Adm_Mod', 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00')
ON CONFLICT (Right_ID) DO UPDATE SET
  Description = EXCLUDED.Description,
  Right_value = EXCLUDED.Right_value,
  Module_ID = EXCLUDED.Module_ID,
  Record_status = EXCLUDED.Record_status,
  Stamp = EXCLUDED.Stamp;

-- 5. Recreate usermodule_rights correctly if it was accidentally created with only id and created_at
DROP TABLE IF EXISTS usermodule_rights CASCADE;

CREATE TABLE usermodule_rights (
  userid VARCHAR(30) NOT NULL,
  Right_ID VARCHAR(30) NOT NULL,
  Right_value INT NOT NULL CHECK (Right_value IN (0, 1)),
  Record_status VARCHAR(10) NOT NULL CHECK (Record_status IN ('ACTIVE', 'INACTIVE')),
  Stamp VARCHAR(60),
  PRIMARY KEY (userid, Right_ID),
  FOREIGN KEY (userid) REFERENCES users(userId),
  FOREIGN KEY (Right_ID) REFERENCES rights(Right_ID)
);

-- 6. Give SUPERADMIN all rights
INSERT INTO usermodule_rights (userid, Right_ID, Right_value, Record_status, Stamp)
VALUES
  ('user1', 'PRD_DEL', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
  ('user1', 'PRD_EDIT', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
  ('user1', 'PRD_ADD', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
  ('user1', 'REP_001', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
  ('user1', 'REP_002', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
  ('user1', 'ADM_USER', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00')
ON CONFLICT (userid, Right_ID) DO UPDATE SET
  Right_value = EXCLUDED.Right_value,
  Record_status = EXCLUDED.Record_status,
  Stamp = EXCLUDED.Stamp;

-- 7. Verify
SELECT * FROM users WHERE userId = 'user1';
SELECT * FROM user_module WHERE userid = 'user1';
SELECT * FROM usermodule_rights WHERE userid = 'user1';
