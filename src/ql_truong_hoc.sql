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

-- Dumping data for table baitap_ttcs.admin: ~1 rows (approximately)
REPLACE INTO `admin` (`idAdmin`, `username`, `password`, `idGV`, `img`) VALUES
	('ad001', 'admin', '1', 'gv001', 'D:\\work_space\\bai_tap_thuc_tap_co_so\\src\\img\\anh3.jpg');

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

-- Dumping data for table baitap_ttcs.diemks: ~20 rows (approximately)
REPLACE INTO `diemks` (`idks`, `ten`, `idkhoithi`, `diem1`, `diem2`, `diem3`, `idhs`, `idnk`) VALUES
	('k1ks010', 'khảo sát đợt 3 lớp 10', 'KA001', '8', '9', '8.8', 'd1hs010', 'nk001'),
	('k1ks011', 'khảo sát đợt 3 lớp 10', 'KA001', '8', '9', '8.8', 'd1hs011', 'nk001'),
	('k1ks012', 'khảo sát đợt 3 lớp 10', 'KA001', '8', '9', '8.8', 'd1hs012', 'nk001'),
	('k1ks013', 'khảo sát đợt 3 lớp 10', 'KA001', '9', '9', '8.8', 'd1hs013', 'nk001'),
	('k1ks014', 'khảo sát đợt 3 lớp 10', 'KA001', '9', '9', '8.8', 'd1hs014', 'nk001'),
	('k1ks015', 'khảo sát đợt 2 lớp 10', 'KA001', '8', '9', '8.8', 'd1hs010', 'nk001'),
	('k1ks016', 'khảo sát đợt 2 lớp 10', 'KA001', '8', '9', '8.8', 'd1hs011', 'nk001'),
	('k1ks017', 'khảo sát đợt 2 lớp 10', 'KA001', '8', '9', '8.8', 'd1hs012', 'nk001'),
	('k1ks018', 'khảo sát đợt 2 lớp 10', 'KA001', '9', '9', '8.8', 'd1hs013', 'nk001'),
	('k1ks019', 'khảo sát đợt 2 lớp 10', 'KA001', '9', '9', '8.8', 'd1hs014', 'nk001'),
	('k1ks093', 'khảo sát lớp 12 đợt 1', 'KA001', '8', '9', '8.8', 'd1hs010', 'nk010'),
	('k1ks094', 'khảo sát lớp 12 đợt 1', 'KA001', '8', '9', '8.8', 'd1hs011', 'nk010'),
	('k1ks095', 'khảo sát lớp 12 đợt 1', 'KA001', '8', '9', '8.8', 'd1hs012', 'nk010'),
	('k1ks096', 'khảo sát lớp 12 đợt 1', 'KA001', '9', '9', '8.8', 'd1hs013', 'nk010'),
	('k1ks097', 'khảo sát lớp 12 đợt 1', 'KA001', '9', '9', '8.8', 'd1hs014', 'nk010'),
	('k1ks098', 'khảo sát lớp 12 đợt 2', 'KA000', '8', '9', '8.8', 'd1hs010', 'nk010'),
	('k1ks099', 'khảo sát lớp 12 đợt 2', 'KA000', '8', '9', '8.8', 'd1hs011', 'nk010'),
	('k1ks100', 'khảo sát lớp 12 đợt 2', 'KA000', '8', '9', '8.8', 'd1hs012', 'nk010'),
	('k1ks101', 'khảo sát lớp 12 đợt 2', 'KA000', '9', '9', '8.8', 'd1hs013', 'nk010'),
	('k1ks102', 'khảo sát lớp 12 đợt 2', 'KA000', '9', '9', '8.8', 'd1hs014', 'nk010');

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

-- Dumping data for table baitap_ttcs.giaovien: ~8 rows (approximately)
REPLACE INTO `giaovien` (`idGV`, `ten`, `dob`, `sdt`, `email`, `diachi`, `bomon`, `namCT`, `username`, `password`, `trangthai`, `gioitinh`) VALUES
	('gv001', 'nguyen thi hoa', '5-12-1996', '0358989123', 'hoanguyen@gmail.com', 'hadong-hanoi', 'tienganh', '6', 'teacher', '1', 'còn dạy', 'nu'),
	('gv002', 'nguyen thi nga', '5-12-1995', '0358976789', 'nguyennga@gmail.com', 'hadong-hanoi', 'toan', '5', 'nga', '1', 'còn dạy', 'nu'),
	('gv015', 'Nguyễn Văn Hưng', '2024-05-10', '0356789123', 'hung@gmail.com', 'ha noi', 'vat ly', '6', 'hung', '1', 'còn dạy', NULL),
	('gv016', 'Nguyễn Thị Đức', '2024-05-12', '0356789123', 'duc@gamil.com', 'ha noi', 'toan', '8', 'duc', '1', 'còn dạy', NULL),
	('gv017', 'Nguyễn Thị Hậu', '2024-05-18', '0356789145', 'hau@gmail.com', 'ha noi', 'ngu van', '4', 'hau', '1', 'còn dạy', NULL),
	('gv018', 'Nguyễn Văn Lộc', '2024-05-12', '0356789123', 'loc@gmail.com', 'ha noi', 'bao ve', '9', 'loc', '1', 'còn công tác', NULL),
	('gv019', 'Nguyễn Thị Huế', '2024-05-12', '0356789145', 'hue@gmail.com', 'ha noi', 'tieng anh', '5', 'hue', '1', 'còn dạy', NULL),
	('gv021', 'Nguyễn Thanh Mai', '2024-05-18', '0356789145', 'mai@gmail.com', 'ha noi', 'Hoa hoc', '8', 'maihoa', '1', 'còn dạy', NULL);

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

-- Dumping data for table baitap_ttcs.gvcn: ~11 rows (approximately)
REPLACE INTO `gvcn` (`idGVCN`, `idGV`, `idlop`) VALUES
	('k1cn001', 'gv002', 'l001'),
	('k1cn002', 'gv002', 'l002'),
	('k1cn003', 'gv002', 'l004'),
	('k1cn004', 'gv002', 'l003'),
	('k1cn011', 'gv001', 'l010'),
	('k1cn012', 'gv002', 'l011'),
	('k1cn016', 'gv001', 'l015'),
	('k1cn017', 'gv001', 'l016'),
	('k1cn018', 'gv001', 'l017'),
	('k1cn019', 'gv001', 'l018'),
	('k1cn020', 'gv001', 'l019');

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

-- Dumping data for table baitap_ttcs.hocsinh: ~8 rows (approximately)
REPLACE INTO `hocsinh` (`idhs`, `name`, `dob`, `diachi`, `gioitinh`, `idlop`, `username`, `password`, `img`) VALUES
	('d1hs001', 'trang', '2024-05-01', 'hanoi', 'nu', 'l003', 'trang', '3', ''),
	('d1hs010', 'nguyen van chung ', '2024-04-28', 'ha noi', 'Nam', 'l002', 'admin', '2', 'D:\\work_space\\bai_tap_thuc_tap_co_so\\src\\img\\anh1.jpg'),
	('d1hs011', 'mai', '2024-04-26', 'ha noi', 'Nữ', 'l001', 'admin', '1', 'D:\\work_space\\bai_tap_thuc_tap_co_so\\src\\img\\anh2.jpg'),
	('d1hs012', 'lan', '2024-04-16', 'ha noi', 'Nữ', 'l002', 'admin', '1', 'D:\\work_space\\bai_tap_thuc_tap_co_so\\src\\img\\anh3.webp'),
	('d1hs013', 'mạnh', '2024-04-26', 'ha noi', 'Nam', 'l003', 'manh', '1', 'D:\\work_space\\bai_tap_thuc_tap_co_so\\src\\img\\anh1.jpg'),
	('d1hs014', 'thieu', '2024-04-24', 'ha noi', 'Nam', 'l001', 'manager', '1', NULL),
	('d1hs018', 'nguyen Thị Thúy Lan', '2024-05-10', 'ha noi', 'Nữ', 'l001', 'lan', '1', NULL),
	('d1hs019', 'Nguyễn Thúy Lan', '2024-05-18', 'ha noi', 'Nữ', 'l001', 'lan', '1', NULL),
	('d1hs020', 'Phan Văn Hòa', '2024-05-24', 'ha noi', 'Nam', 'l001', 'hoa', '1', NULL),
	('d1hs021', 'Nguyễn Thị Mai', '2024-05-08', 'ha noi', 'Nữ', 'l001', 'mai', '1', NULL);

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

-- Dumping data for table baitap_ttcs.khoithi: ~4 rows (approximately)
REPLACE INTO `khoithi` (`idkhoithi`, `ten`, `mon1`, `mon2`, `mon3`) VALUES
	('KA000', 'A00', 'toán ', 'lý ', 'hóa'),
	('KA001', 'A01', 'toán', 'lý', 'tiếng anh'),
	('KB000', 'B00', 'toán', 'hóa', 'sinh'),
	('KD000', 'D00', 'toán', 'văn', 'anh');

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

-- Dumping data for table baitap_ttcs.lop: ~11 rows (approximately)
REPLACE INTO `lop` (`idlop`, `ten`, `idnk`, `idtkb`) VALUES
	('l001', '10a', 'nk010', NULL),
	('l002', '10b', 'nk010', NULL),
	('l003', '10c', 'nk002', NULL),
	('l004', '10a', 'nk002', NULL),
	('l010', '11a', 'nk001', NULL),
	('l011', '10b', 'nk002', NULL),
	('l015', '10d', 'nk002', NULL),
	('l016', '10e', 'nk002', NULL),
	('l017', '10b', 'nk002', NULL),
	('l018', '10c', 'nk002', NULL),
	('l019', '10f', 'nk002', NULL);

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

-- Dumping data for table baitap_ttcs.monhoc: ~0 rows (approximately)

-- Dumping structure for table baitap_ttcs.nienkhoa
DROP TABLE IF EXISTS `nienkhoa`;
CREATE TABLE IF NOT EXISTS `nienkhoa` (
  `idnk` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ten` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`idnk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table baitap_ttcs.nienkhoa: ~2 rows (approximately)
REPLACE INTO `nienkhoa` (`idnk`, `ten`) VALUES
	('nk001', '2001-2004'),
	('nk002', '2002-2005'),
	('nk010', '2021-2024');

-- Dumping structure for table baitap_ttcs.thongbao1
DROP TABLE IF EXISTS `thongbao1`;
CREATE TABLE IF NOT EXISTS `thongbao1` (
  `idtb` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'AUTO_INCREMENT',
  `noidung` text COLLATE utf8mb4_general_ci,
  `ngaytao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idtb`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table baitap_ttcs.thongbao1: ~1 rows (approximately)
REPLACE INTO `thongbao1` (`idtb`, `noidung`, `ngaytao`) VALUES
	('tb010', 'xin chào năm mới, chúc các em học sinh và các thầy cô một năm mới an khang hạnh phúc', '2024-04-30 16:22:20');

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

-- Dumping data for table baitap_ttcs.tkb_gv: ~3 rows (approximately)
REPLACE INTO `tkb_gv` (`idtkb_GV`, `thu`, `tiet1`, `tiet2`, `tiet3`, `tiet4`, `tiet5`, `ct1`, `ct2`, `idgv`) VALUES
	('tkb001', '2', 'toán(12A)', 'toán(12A)', '', 'toán(12B)', 'toán(12B)', '', '', 'gv001'),
	('tkb006', '6', 'toan(10A)', 'toan(10A)', '', '', '', 'Toán(11B)', 'Toán(11A)', 'gv001'),
	('tkb012', '3', 'toán(12A)', 'toán(12A)', 'toán(12A)', 'toán(12A)', '', '', '', 'gv001');

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

-- Dumping data for table baitap_ttcs.tkb_hs: ~2 rows (approximately)
REPLACE INTO `tkb_hs` (`idtkb`, `thu`, `tiet1`, `tiet2`, `tiet3`, `tiet4`, `tiet5`, `ct1`, `ct2`, `idlop`) VALUES
	('tkb001', '2', 'toán', 'toán', 'văn', 'văn', 'địa', NULL, NULL, 'l001'),
	('tkb002', '3', 'lý', 'lý', 'tiếng anh', 'sử ', 'sinh', NULL, NULL, 'l003');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
