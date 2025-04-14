-- 创建数据库（如果不存在）
CREATE DATABASE IF NOT EXISTS `small-demo`;

-- 使用数据库
USE `small-demo`;

-- 创建班级表
CREATE TABLE IF NOT EXISTS `classes` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `class_name` VARCHAR(100) NOT NULL,
    `classroom` VARCHAR(50) NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `head_teacher` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -- 添加示例数据
-- INSERT INTO `classes` (`class_name`, `classroom`, `start_date`, `end_date`, `head_teacher`) VALUES
-- ('2024第01期01班', 'G102', '2024-03-01', '2024-04-15', '赵敏'),
-- ('2024第01期02班', 'G102', '2024-03-01', '2024-04-15', '周芷若');

