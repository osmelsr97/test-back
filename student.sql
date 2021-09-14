/*
 Navicat Premium Data Transfer

 Source Server         : Localhost
 Source Server Type    : MySQL
 Source Server Version : 100411
 Source Host           : localhost:3306
 Source Schema         : student

 Target Server Type    : MySQL
 Target Server Version : 100411
 File Encoding         : 65001

 Date: 11/09/2021 22:17:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for grade
-- ----------------------------
DROP TABLE IF EXISTS `grade`;
CREATE TABLE `grade`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of grade
-- ----------------------------
INSERT INTO `grade` VALUES ('2355333c-48cf-41fd-96b2-18c0376c3caf', '1st');
INSERT INTO `grade` VALUES ('00b15029-ddc1-4c40-bb39-93c14f3c380b', '2nd');
INSERT INTO `grade` VALUES ('9f06c576-7592-4aeb-a386-a3ca2eea20b2', '3rd');
INSERT INTO `grade` VALUES ('eb8e652b-fdcb-41cb-bcd2-71b0c053a314', '4th');
INSERT INTO `grade` VALUES ('0a93499b-4f9c-40d4-b56a-450163d223cd', '5th');
INSERT INTO `grade` VALUES ('aaa0596b-bd6e-4fb4-b606-07af7e4b2667', '6th');


-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `firstName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lastName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `age` int(11) NOT NULL,
  `gradeId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_a56c051c91dbe1068ad683f536`(`email`) USING BTREE,
  INDEX `FK_30ade015a34ff975ee322b3adbd`(`gradeId`) USING BTREE,
  CONSTRAINT `FK_30ade015a34ff975ee322b3adbd` FOREIGN KEY (`gradeId`) REFERENCES `grade` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
