-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for quan_ly_open_tour
CREATE DATABASE IF NOT EXISTS `quan_ly_open_tour` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `quan_ly_open_tour`;

-- Dumping structure for table quan_ly_open_tour.tblbookdetail
CREATE TABLE IF NOT EXISTS `tblbookdetail` (
  `id` int NOT NULL,
  `thoigianbatdau` date DEFAULT NULL,
  `giatour` float DEFAULT NULL,
  `khachhangdaidien` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `songuoi` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `idtour` int DEFAULT NULL,
  `idbooking` int DEFAULT NULL,
  `ngaythanhtoan` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_tblbookdetail_tbltour` (`idtour`),
  KEY `FK_tblbookdetail_tblbooking` (`idbooking`),
  CONSTRAINT `FK_tblbookdetail_tblbooking` FOREIGN KEY (`idbooking`) REFERENCES `tblbooking` (`id`),
  CONSTRAINT `FK_tblbookdetail_tbltour` FOREIGN KEY (`idtour`) REFERENCES `tbltour` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table quan_ly_open_tour.tblbooking
CREATE TABLE IF NOT EXISTS `tblbooking` (
  `id` int NOT NULL,
  `thoigiandat` date DEFAULT NULL,
  `idclient` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_tblbooking_tblclient` (`idclient`),
  CONSTRAINT `FK_tblbooking_tblclient` FOREIGN KEY (`idclient`) REFERENCES `tblclient` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table quan_ly_open_tour.tblclient
CREATE TABLE IF NOT EXISTS `tblclient` (
  `id` int NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cccd` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sdt` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `diachi` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table quan_ly_open_tour.tblservice
CREATE TABLE IF NOT EXISTS `tblservice` (
  `id` int NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mota` text COLLATE utf8mb4_general_ci,
  `gia` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table quan_ly_open_tour.tblservicedetail
CREATE TABLE IF NOT EXISTS `tblservicedetail` (
  `id` int DEFAULT NULL,
  `tongtien` float DEFAULT NULL,
  `idservice` int DEFAULT NULL,
  `idbookdetail` int DEFAULT NULL,
  KEY `FK__tblservice` (`idservice`),
  KEY `FK_tblservicedetail_tblbookdetail` (`idbookdetail`),
  CONSTRAINT `FK__tblservice` FOREIGN KEY (`idservice`) REFERENCES `tblservice` (`id`),
  CONSTRAINT `FK_tblservicedetail_tblbookdetail` FOREIGN KEY (`idbookdetail`) REFERENCES `tblbookdetail` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table quan_ly_open_tour.tbltour
CREATE TABLE IF NOT EXISTS `tbltour` (
  `id` int NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `noiden` text COLLATE utf8mb4_general_ci,
  `noixuatphat` text COLLATE utf8mb4_general_ci,
  `lichtrinh` text COLLATE utf8mb4_general_ci,
  `mota` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table quan_ly_open_tour.tbluser
CREATE TABLE IF NOT EXISTS `tbluser` (
  `id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `position` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
