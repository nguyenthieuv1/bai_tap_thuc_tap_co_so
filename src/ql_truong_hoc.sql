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


-- Dumping database structure for baitap_ttcs
DROP DATABASE IF EXISTS `baitap_ttcs`;
CREATE DATABASE IF NOT EXISTS `baitap_ttcs` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `baitap_ttcs`;

-- Dumping structure for table baitap_ttcs.admin
DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `idAdmin` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `idGV` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `img` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`idAdmin`),
  KEY `FK__gv` (`idGV`),
  CONSTRAINT `FK__gv` FOREIGN KEY (`idGV`) REFERENCES `giaovien` (`idGV`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table baitap_ttcs.diemks
DROP TABLE IF EXISTS `diemks`;
CREATE TABLE IF NOT EXISTS `diemks` (
  `idks` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ten` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `idkhoithi` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `diem1` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `diem2` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `diem3` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `idhs` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `idnk` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`idks`),
  KEY `FK__hocsinh_diemks` (`idhs`),
  KEY `FK_diemks_khoithi` (`idkhoithi`),
  KEY `FK_diemks_nienkhoa` (`idnk`),
  CONSTRAINT `FK__hocsinh_diemks` FOREIGN KEY (`idhs`) REFERENCES `hocsinh` (`idhs`),
  CONSTRAINT `FK_diemks_khoithi` FOREIGN KEY (`idkhoithi`) REFERENCES `khoithi` (`idkhoithi`),
  CONSTRAINT `FK_diemks_nienkhoa` FOREIGN KEY (`idnk`) REFERENCES `nienkhoa` (`idnk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table baitap_ttcs.giaovien
DROP TABLE IF EXISTS `giaovien`;
CREATE TABLE IF NOT EXISTS `giaovien` (
  `idGV` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ten` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `dob` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sdt` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `diachi` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `bomon` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `namCT` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `username` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `trangthai` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `gioitinh` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`idGV`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table baitap_ttcs.gvcn
DROP TABLE IF EXISTS `gvcn`;
CREATE TABLE IF NOT EXISTS `gvcn` (
  `idGVCN` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `idGV` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `idlop` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`idGVCN`),
  KEY `FK__giaovien` (`idGV`),
  KEY `FK_gvcn_lop` (`idlop`),
  CONSTRAINT `FK__giaovien` FOREIGN KEY (`idGV`) REFERENCES `giaovien` (`idGV`),
  CONSTRAINT `FK_gvcn_lop` FOREIGN KEY (`idlop`) REFERENCES `lop` (`idlop`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table baitap_ttcs.hocsinh
DROP TABLE IF EXISTS `hocsinh`;
CREATE TABLE IF NOT EXISTS `hocsinh` (
  `idhs` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `diachi` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `gioitinh` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `idlop` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `username` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `img` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`idhs`),
  KEY `FK_hocsinh_lop` (`idlop`),
  CONSTRAINT `FK_hocsinh_lop` FOREIGN KEY (`idlop`) REFERENCES `lop` (`idlop`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table baitap_ttcs.khoithi
DROP TABLE IF EXISTS `khoithi`;
CREATE TABLE IF NOT EXISTS `khoithi` (
  `idkhoithi` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ten` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mon1` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mon2` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mon3` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`idkhoithi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table baitap_ttcs.lop
DROP TABLE IF EXISTS `lop`;
CREATE TABLE IF NOT EXISTS `lop` (
  `idlop` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ten` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `idnk` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `idtkb` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`idlop`),
  KEY `FK_lop_nienkhoa` (`idnk`),
  KEY `FK_lop_tkb_hs` (`idtkb`),
  CONSTRAINT `FK_lop_nienkhoa` FOREIGN KEY (`idnk`) REFERENCES `nienkhoa` (`idnk`),
  CONSTRAINT `FK_lop_tkb_hs` FOREIGN KEY (`idtkb`) REFERENCES `tkb_hs` (`idtkb`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table baitap_ttcs.monhoc
DROP TABLE IF EXISTS `monhoc`;
CREATE TABLE IF NOT EXISTS `monhoc` (
  `idmon` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `tenmon` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `heso1` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `heso2` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `heso3` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `idhs` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`idmon`),
  KEY `FK__hocsinh` (`idhs`),
  CONSTRAINT `FK__hocsinh` FOREIGN KEY (`idhs`) REFERENCES `hocsinh` (`idhs`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table baitap_ttcs.nienkhoa
DROP TABLE IF EXISTS `nienkhoa`;
CREATE TABLE IF NOT EXISTS `nienkhoa` (
  `idnk` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ten` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`idnk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table baitap_ttcs.thongbao1
DROP TABLE IF EXISTS `thongbao1`;
CREATE TABLE IF NOT EXISTS `thongbao1` (
  `idtb` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'AUTO_INCREMENT',
  `noidung` text COLLATE utf8mb4_general_ci,
  `ngaytao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idtb`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table baitap_ttcs.tkb_gv
DROP TABLE IF EXISTS `tkb_gv`;
CREATE TABLE IF NOT EXISTS `tkb_gv` (
  `idtkb_GV` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `thu` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tiet1` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tiet2` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tiet3` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tiet4` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tiet5` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ct1` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ct2` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `idgv` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`idtkb_GV`),
  KEY `FK_tkb_gv_giaovien` (`idgv`),
  CONSTRAINT `FK_tkb_gv_giaovien` FOREIGN KEY (`idgv`) REFERENCES `giaovien` (`idGV`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table baitap_ttcs.tkb_hs
DROP TABLE IF EXISTS `tkb_hs`;
CREATE TABLE IF NOT EXISTS `tkb_hs` (
  `idtkb` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `thu` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tiet1` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tiet2` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tiet3` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tiet4` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tiet5` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ct1` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ct2` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `idlop` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`idtkb`),
  KEY `FK_tkb_hs_lop` (`idlop`),
  CONSTRAINT `FK_tkb_hs_lop` FOREIGN KEY (`idlop`) REFERENCES `lop` (`idlop`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
