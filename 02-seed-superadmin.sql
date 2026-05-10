CREATE TABLE users (
    userId VARCHAR(20) NOT NULL PRIMARY KEY,
    username VARCHAR(50),
    lastName VARCHAR(50),
    firstName VARCHAR(50),
    user_type VARCHAR(20) CHECK (user_type IN ('SUPERADMIN', 'USER', 'ADMIN')),
    record_status VARCHAR(10) CHECK (record_status IN ('ACTIVE', 'INACTIVE')),
    stamp VARCHAR(60)
);

INSERT INTO users (userId, username, lastName, firstName, user_type, record_status, stamp) VALUES
('user1', 'Jerry', 'Jeremias', 'Esperanza', 'SUPERADMIN', 'ACTIVE', 'ACTIVATED USER1 2023-10-20 9:42'),
('user2', 'Maria', 'Santos', 'Maria', 'USER', 'ACTIVE', 'REGISTERED USER2 2023-10-20 9:42'),
('user3', 'Alex', 'Pantola', 'Alexis', 'ADMIN', 'ACTIVE', 'ACTIVATED USER3 2023-10-20 9:42');

CREATE TABLE Module (
    Module_ID VARCHAR(30) NOT NULL PRIMARY KEY ,
    DESCRIPTION VARCHAR(100),
    Record_status VARCHAR(10) NOT NULL CHECK (Record_status IN ('ACTIVE', 'INACTIVE')),
    Stamp VARCHAR(60)
);

INSERT INTO Module (Module_ID, DESCRIPTION, Record_status, Stamp)
VALUES
    ('Prod_Mod', 'Product Module', 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:42'),
    ('Report_Mod', 'Report Module', 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:42'),
    ('Adm_Mod', 'Admin Module', 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:42');

CREATE TABLE user_module (
    userid VARCHAR(30) NOT NULL,
    Module_ID VARCHAR(30) NOT NULL,
    rights_value INT NOT NULL CHECK (rights_value IN (0, 1)),
    record_status VARCHAR(10) NOT NULL CHECK (record_status IN ('ACTIVE', 'INACTIVE')),
    stamp VARCHAR(60),
    PRIMARY KEY (userid, Module_ID),
    FOREIGN KEY (userid) REFERENCES Users(userid),
    FOREIGN KEY (Module_ID) REFERENCES Module(Module_ID)
);

INSERT INTO user_module (userid, Module_ID, rights_value, record_status, stamp)
VALUES
    ('user1', 'Prod_Mod', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:56'),
    ('user1', 'Report_Mod', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:56'),
    ('user1', 'Adm_Mod', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:56'),
    ('user2', 'Prod_Mod', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:56'),
    ('user2', 'Report_Mod', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:56'),
    ('user2', 'Adm_Mod', 0, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:56'),
    ('user3', 'Prod_Mod', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:56'),
    ('user3', 'Report_Mod', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:56'),
    ('user3', 'Adm_Mod', 0, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:56');


CREATE TABLE rights (
    Right_ID VARCHAR(15) PRIMARY KEY NOT NULL,
    Description VARCHAR(30),
    Right_value INT NOT NULL CHECK (Right_value IN (0, 1)),
    Module_ID VARCHAR(30) NOT NULL,
    Record_status VARCHAR(10) NOT NULL CHECK (Record_status IN ('ACTIVE', 'INACTIVE')),
    Stamp VARCHAR(60),
    FOREIGN KEY (Module_ID) REFERENCES Module(Module_ID)
);

INSERT INTO rights (Right_ID, Description, Right_value, Module_ID, Record_status, Stamp)
VALUES
    ('PRD_DEL', 'Product Deletion', 1, 'Prod_Mod', 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
    ('PRD_EDIT', 'Product Edit', 1, 'Prod_Mod', 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
    ('PRD_ADD', 'Product Insertion', 1, 'Prod_Mod', 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
    ('REP_001', 'Product Report Listing', 1, 'Report_Mod', 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
    ('REP_002', 'Product Top Selling', 1, 'Report_Mod', 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
    ('ADM_USER', 'Admin Activate User', 0, 'Adm_Mod', 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00');

CREATE TABLE UserModule_Rights (
    userid VARCHAR(30) NOT NULL,
    Right_ID VARCHAR(30) NOT NULL,
    Right_value INT NOT NULL CHECK (Right_value IN (0, 1)),
    Record_status VARCHAR(10) NOT NULL CHECK (Record_status IN ('ACTIVE', 'INACTIVE')),
    Stamp VARCHAR(60),
    PRIMARY KEY (userid, Right_ID),
    FOREIGN KEY (userid) REFERENCES Users(userid),
    FOREIGN KEY (Right_ID) REFERENCES rights(Right_ID)
);

INSERT INTO UserModule_Rights (userid, Right_ID, Right_value, Record_status, Stamp)
VALUES
    ('user1', 'PRD_DEL', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
    ('user1', 'PRD_EDIT', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
    ('user1', 'PRD_ADD', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
    ('user1', 'REP_001', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
    ('user1', 'REP_002', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
    ('user1', 'ADM_USER', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
    ('user2', 'PRD_DEL', 0, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
    ('user2', 'PRD_EDIT', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
    ('user2', 'PRD_ADD', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
    ('user2', 'REP_001', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
    ('user2', 'REP_002', 0, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
    ('user2', 'ADM_USER', 0, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
    ('user3', 'PRD_DEL', 0, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
    ('user3', 'PRD_EDIT', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
    ('user3', 'PRD_ADD', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
    ('user3', 'REP_001', 1, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
    ('user3', 'REP_002', 0, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00'),
    ('user3', 'ADM_USER', 0, 'ACTIVE', 'ACTIVATED USER1 2025-10-20 10:00');

