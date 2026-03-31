-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 31, 2026 at 11:47 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `volt_kenya`
--

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `port_id` int(11) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `payment_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(20) DEFAULT 'completed',
  `phone` varchar(15) DEFAULT NULL,
  `kwh` decimal(10,3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `port_id`, `amount`, `payment_date`, `status`, `phone`, `kwh`) VALUES
(17, 5, 100.00, '2025-11-06 19:20:34', 'pending', '+254788888888', 2.500),
(18, 6, 100.00, '2025-11-07 04:44:07', 'pending', '+254734536453', 2.500),
(19, 5, 100.00, '2025-11-07 04:49:26', 'pending', '+254675656565', 2.500),
(20, 10, 67.00, '2025-11-07 10:48:02', 'completed', '+254767656465', 1.680),
(21, 11, 500.00, '2026-03-31 08:46:00', 'completed', '+254754667567', 12.500);

-- --------------------------------------------------------

--
-- Table structure for table `ports`
--

CREATE TABLE `ports` (
  `id` int(11) NOT NULL,
  `server_port` varchar(50) NOT NULL,
  `local_ip` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `status` varchar(10) DEFAULT 'active',
  `lat` decimal(10,8) DEFAULT NULL,
  `lng` decimal(11,8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ports`
--

INSERT INTO `ports` (`id`, `server_port`, `local_ip`, `location`, `status`, `lat`, `lng`) VALUES
(5, '3', '123.3.3.3', 'Kiambu', 'inactive', NULL, NULL),
(6, '4', '192.3.23.2', 'Zambezi', 'active', NULL, NULL),
(7, '30', '192.2.34.3', 'Nairobi', 'active', NULL, NULL),
(8, '6', '192.3.4.3', 'UpperHill', 'active', NULL, NULL),
(9, '7', '192.3.3.4', 'paradise lost', 'active', NULL, NULL),
(10, '40', '192.3.4.34', 'Kisumu', 'active', -0.05996700, 34.94121900),
(11, '5', '192.2.2.2', 'Nairobi', 'active', -1.27500600, 36.85007000),
(12, '3900', '192.168.2.1', 'Nakuru', 'inactive', -0.38085700, 35.92817100);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_payments_ports` (`port_id`);

--
-- Indexes for table `ports`
--
ALTER TABLE `ports`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `ports`
--
ALTER TABLE `ports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `fk_payments_ports` FOREIGN KEY (`port_id`) REFERENCES `ports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
