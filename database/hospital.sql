-- --------------------------------------------------------
-- Database Setup for Hospital Project
-- --------------------------------------------------------

-- Create database (only if it doesn't exist)
CREATE DATABASE IF NOT EXISTS hospital
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE hospital;

-- --------------------------------------------------------
-- Users Table
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(50) NOT NULL,
  `surname` VARCHAR(50) NOT NULL,
  `dob` DATE DEFAULT NULL,
  `hospital_number` VARCHAR(20) DEFAULT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `department_id` INT(11) DEFAULT NULL,
  `telephone_number` VARCHAR(15) DEFAULT NULL,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_general_ci;

-- (Optional) Insert initial admin user
-- Uncomment this if you want a starting user
/*
INSERT INTO `users` (`firstName`, `surname`, `email`, `password`)
VALUES ('Admin', 'User', 'admin@example.com', 'hashed_password_here');
*/


INSERT INTO `users` 
(`id`, `firstName`, `surname`, `dob`, `hospital_number`, `email`, `department_id`, `telephone_number`, `password`, `created_at`) 
VALUES
(1, 'Aiden', 'Clark', '2010-04-12', 'KID100001', 'aiden.clark@example.com', 1, '0711111111', '$2b$10$1v0x5c8WcY8fP7Ek2e1S0uHcPe1PN3t3TK0hQbsSYFJXQouKEGfOe', NOW()),

(2, 'Bella', 'Sanders', '2011-08-23', 'KID100002', 'bella.sanders@example.com', 2, '0711111112', '$2b$10$1v0x5c8WcY8fP7Ek2e1S0uHcPe1PN3t3TK0hQbsSYFJXQouKEGfOe', NOW()),

(3, 'Caleb', 'Wright', '2009-12-05', 'KID100003', 'caleb.wright@example.com', 3, '0711111113', '$2b$10$1v0x5c8WcY8fP7Ek2e1S0uHcPe1PN3t3TK0hQbsSYFJXQouKEGfOe', NOW()),

(4, 'Daisy', 'Mitchell', '2012-03-17', 'KID100004', 'daisy.mitchell@example.com', 1, '0711111114', '$2b$10$1v0x5c8WcY8fP7Ek2e1S0uHcPe1PN3t3TK0hQbsSYFJXQouKEGfOe', NOW()),

(5, 'Ethan', 'Harris', '2010-07-29', 'KID100005', 'ethan.harris@example.com', 4, '0711111115', '$2b$10$1v0x5c8WcY8fP7Ek2e1S0uHcPe1PN3t3TK0hQbsSYFJXQouKEGfOe', NOW()),

(6, 'Freya', 'Stevens', '2011-02-14', 'KID100006', 'freya.stevens@example.com', 2, '0711111116', '$2b$10$1v0x5c8WcY8fP7Ek2e1S0uHcPe1PN3t3TK0hQbsSYFJXQouKEGfOe', NOW()),

(7, 'Gabriel', 'Hunter', '2008-09-09', 'KID100007', 'gabriel.hunter@example.com', 3, '0711111117', '$2b$10$1v0x5c8WcY8fP7Ek2e1S0uHcPe1PN3t3TK0hQbsSYFJXQouKEGfOe', NOW()),

(8, 'Holly', 'Murray', '2009-05-31', 'KID100008', 'holly.murray@example.com', 1, '0711111118', '$2b$10$1v0x5c8WcY8fP7Ek2e1S0uHcPe1PN3t3TK0hQbsSYFJXQouKEGfOe', NOW()),

(9, 'Isaac', 'Ford', '2012-10-21', 'KID100009', 'isaac.ford@example.com', 4, '0711111119', '$2b$10$1v0x5c8WcY8fP7Ek2e1S0uHcPe1PN3t3TK0hQbsSYFJXQouKEGfOe', NOW()),

(10, 'Jasmine', 'Reed', '2010-01-08', 'KID100010', 'jasmine.reed@example.com', 2, '0711111120', '$2b$10$1v0x5c8WcY8fP7Ek2e1S0uHcPe1PN3t3TK0hQbsSYFJXQouKEGfOe', NOW());

COMMIT;
