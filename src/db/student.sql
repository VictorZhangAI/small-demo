CREATE TABLE students (
    student_id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    class VARCHAR(50) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    education_level ENUM('初中', '高中', '大专', '本科', '硕士', '博士') NOT NULL,
    violation_count INT DEFAULT 0,
    violation_points INT DEFAULT 0,
    last_operation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 添加一些示例数据
INSERT INTO students (student_id, name, class, gender, phone, education_level) VALUES
('2023001', '张三', '2024第01期10班', '男', '13800138001', '本科'),
('2023002', '李四', '2024第01期13班', '女', '13800138002', '硕士'),
('2023003', '王五', '2025第01期10班', '男', '13800138003', '本科'); 