-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2019 at 10:20 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `groepsopdracht_rentapet`
--

-- --------------------------------------------------------

--
-- Table structure for table `pets`
--

CREATE TABLE `pets` (
  `id_pet` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `id_breed` smallint(6) NOT NULL,
  `id_gender` tinyint(3) NOT NULL,
  `rent_per_day` decimal(8,2) NOT NULL,
  `date_of_birth` date NOT NULL,
  `description` varchar(250) NOT NULL,
  `availability` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pets`
--

INSERT INTO `pets` (`id_pet`, `name`, `id_breed`, `id_gender`, `rent_per_day`, `date_of_birth`, `description`, `availability`) VALUES
(1, 'Camilla', 1, 1, '60.00', '2015-04-17', '', 1),
(2, 'Sonic', 2, 2, '15.99', '2017-01-01', '', 1),
(3, 'Bernadette', 3, 1, '6.99', '2019-03-02', '', 1),
(4, 'Hans', 4, 2, '2000.00', '1974-08-21', '', 1),
(5, 'Nugget', 5, 2, '32.50', '2013-06-29', '', 1),
(6, 'Balto', 6, 2, '249.99', '2007-04-06', '', 1),
(7, 'Jos', 7, 1, '99.99', '2012-12-13', '', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`id_pet`),
  ADD KEY `id_gender` (`id_gender`),
  ADD KEY `id_breed` (`id_breed`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pets`
--
ALTER TABLE `pets`
  MODIFY `id_pet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pets`
--
ALTER TABLE `pets`
  ADD CONSTRAINT `pets_ibfk_1` FOREIGN KEY (`id_gender`) REFERENCES `genders` (`id_gender`),
  ADD CONSTRAINT `pets_ibfk_2` FOREIGN KEY (`id_breed`) REFERENCES `breeds` (`id_breed`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
