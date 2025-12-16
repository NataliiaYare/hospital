-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Dec 16, 2025 at 09:50 PM
-- Server version: 8.0.40
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hospital`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `appointment_date` date NOT NULL,
  `appointment_time` time NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `doctor_name` varchar(100) DEFAULT NULL,
  `status` enum('scheduled','completed','cancelled') DEFAULT 'scheduled',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `user_id`, `title`, `appointment_date`, `appointment_time`, `location`, `doctor_name`, `status`, `created_at`) VALUES
(1, 1, 'MRI Scanning', '2026-01-19', '10:00:00', 'Radiology Dept', 'Dr. Lewis', 'scheduled', '2025-12-15 10:03:23'),
(2, 2, 'Blood Test', '2026-01-20', '09:30:00', 'Lab Room 2', 'Dr. Patel', 'scheduled', '2025-12-15 10:03:23'),
(3, 3, 'Physiotherapy', '2026-01-21', '11:15:00', 'Rehab Center', 'Dr. Evans', 'scheduled', '2025-12-15 10:03:23'),
(4, 4, 'X-Ray', '2026-01-22', '14:00:00', 'Imaging Dept', 'Dr. Lewis', 'scheduled', '2025-12-15 10:03:23'),
(5, 5, 'Routine Checkup', '2026-01-23', '10:45:00', 'Ward 4', 'Dr. Adams', 'scheduled', '2025-12-15 10:03:23');

-- --------------------------------------------------------

--
-- Table structure for table `hospital_buddies`
--

CREATE TABLE `hospital_buddies` (
  `id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `icon_filename` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `hospital_buddies`
--

INSERT INTO `hospital_buddies` (`id`, `name`, `icon_filename`) VALUES
(1, 'Bear', 'bear.png'),
(2, 'Tiger', 'tiger.png'),
(3, 'Dog', 'dog.png'),
(4, 'Fox', 'fox.png'),
(5, 'Owl', 'owl.png'),
(6, 'Lion', 'lion.png'),
(7, 'Panda', 'panda.png'),
(8, 'Rabbit', 'rabbit.png');

-- --------------------------------------------------------

--
-- Table structure for table `medicines`
--

CREATE TABLE `medicines` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `dosage` varchar(50) NOT NULL,
  `time` time NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `medicines`
--

INSERT INTO `medicines` (`id`, `user_id`, `name`, `dosage`, `time`, `start_date`, `end_date`, `created_at`) VALUES
(1, 1, 'Paracetamol', '15mg', '15:00:00', NULL, NULL, '2025-12-15 11:25:35'),
(2, 13, 'Paracetamol', '15mg', '15:00:00', NULL, NULL, '2025-12-15 11:26:25'),
(3, 11, 'Paracetamol', '15mg', '15:00:00', NULL, NULL, '2025-12-15 11:42:26'),
(4, 14, 'Paracetamol', '15mg', '15:00:00', NULL, NULL, '2025-12-15 11:45:43');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `firstName` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `surname` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `dob` date DEFAULT NULL,
  `hospital_number` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `department_id` int DEFAULT NULL,
  `telephone_number` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `surname`, `dob`, `hospital_number`, `email`, `department_id`, `telephone_number`, `password`, `created_at`) VALUES
(1, 'Aiden', 'Clark', '2010-04-12', 'KID100001', 'aiden.clark@example.com', 1, '0711111111', '$2b$10$1v0x5c8WcY8fP7Ek2e1S0uHcPe1PN3t3TK0hQbsSYFJXQouKEGfOe', '2025-12-09 20:43:51'),
(2, 'Bella', 'Sanders', '2011-08-23', 'KID100002', 'bella.sanders@example.com', 2, '0711111112', '$2b$10$1v0x5c8WcY8fP7Ek2e1S0uHcPe1PN3t3TK0hQbsSYFJXQouKEGfOe', '2025-12-09 20:43:51'),
(3, 'Caleb', 'Wright', '2009-12-05', 'KID100003', 'caleb.wright@example.com', 3, '0711111113', '$2b$10$1v0x5c8WcY8fP7Ek2e1S0uHcPe1PN3t3TK0hQbsSYFJXQouKEGfOe', '2025-12-09 20:43:51'),
(4, 'Daisy', 'Mitchell', '2012-03-17', 'KID100004', 'daisy.mitchell@example.com', 1, '0711111114', '$2b$10$1v0x5c8WcY8fP7Ek2e1S0uHcPe1PN3t3TK0hQbsSYFJXQouKEGfOe', '2025-12-09 20:43:51'),
(5, 'Ethan', 'Harris', '2010-07-29', 'KID100005', 'ethan.harris@example.com', 4, '0711111115', '$2b$10$1v0x5c8WcY8fP7Ek2e1S0uHcPe1PN3t3TK0hQbsSYFJXQouKEGfOe', '2025-12-09 20:43:51'),
(6, 'Freya', 'Stevens', '2011-02-14', 'KID100006', 'freya.stevens@example.com', 2, '0711111116', '$2b$10$1v0x5c8WcY8fP7Ek2e1S0uHcPe1PN3t3TK0hQbsSYFJXQouKEGfOe', '2025-12-09 20:43:51'),
(7, 'Gabriel', 'Hunter', '2008-09-09', 'KID100007', 'gabriel.hunter@example.com', 3, '0711111117', '$2b$10$1v0x5c8WcY8fP7Ek2e1S0uHcPe1PN3t3TK0hQbsSYFJXQouKEGfOe', '2025-12-09 20:43:51'),
(8, 'Holly', 'Murray', '2009-05-31', 'KID100008', 'holly.murray@example.com', 1, '0711111118', '$2b$10$1v0x5c8WcY8fP7Ek2e1S0uHcPe1PN3t3TK0hQbsSYFJXQouKEGfOe', '2025-12-09 20:43:51'),
(9, 'Isaac', 'Ford', '2012-10-21', 'KID100009', 'isaac.ford@example.com', 4, '0711111119', '$2b$10$1v0x5c8WcY8fP7Ek2e1S0uHcPe1PN3t3TK0hQbsSYFJXQouKEGfOe', '2025-12-09 20:43:51'),
(10, 'Jasmine', 'Reed', '2010-01-08', 'KID100010', 'jasmine.reed@example.com', 2, '0711111120', '$2b$10$1v0x5c8WcY8fP7Ek2e1S0uHcPe1PN3t3TK0hQbsSYFJXQouKEGfOe', '2025-12-09 20:43:51'),
(11, 'Nataliia', 'Yareshko', NULL, 'nata', 'n@gmail.com', 1, '777777777', '$2b$10$OUnOunUB/rum5pbiTO4a8Oift0BK8EzaCSrn4/QWj8x7MzazgfJGm', '2025-12-09 21:16:27'),
(12, 'Nataliia', 'YARESHKO', '2025-12-09', 'chi123123', 'nata', NULL, NULL, '$2b$10$Ay3bBGmW49b4NbjFU03FQ.xkizgybxjTk4OxWfHIliBCNMSH82HVG', '2025-12-09 21:43:56'),
(13, 'Nataliia', 'YARESHKO', NULL, 'chi123123123', 'nataliiayareshko@gmail.com', 2, '07464111047', '$2b$10$GvulOjqMv204dZf6KbC56.Yep1tYv/LxTALZJxibrH2MaQi5EqbLG', '2025-12-09 21:52:09'),
(14, 'Iryna', 'Klymenko', NULL, '123123', '123123@gmail.com', 1, '123123123123', '$2b$10$BLZ8ssC9MwySuxW/8VjUOuryrB4DwCk9TUyEyENQVhlpCuReW0xpu', '2025-12-15 11:44:19'),
(15, 'ANNA', 'PUPSIK', NULL, '333', 'TSAP604@UKR.NET', 1, '333', '$2b$10$fBV70HlJNwGixbsUaHQqBOCxUJN/wjRky0x2egZ///S5/5Ve2rM82', '2025-12-16 20:28:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_appointments_user` (`user_id`);

--
-- Indexes for table `hospital_buddies`
--
ALTER TABLE `hospital_buddies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medicines`
--
ALTER TABLE `medicines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `hospital_buddies`
--
ALTER TABLE `hospital_buddies`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `medicines`
--
ALTER TABLE `medicines`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `fk_appointments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `medicines`
--
ALTER TABLE `medicines`
  ADD CONSTRAINT `medicines_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
