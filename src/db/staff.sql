CREATE TABLE staff (
    username VARCHAR(50) PRIMARY KEY,
    full_name VARCHAR(50) NOT NULL,
    gender ENUM('男', '女') NOT NULL,
    photo LONGBLOB,
    position ENUM('班主任', '讲师', '学工主管', '教研主管') NOT NULL,
    hire_date DATE NOT NULL,
    department VARCHAR(50),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department) REFERENCES departments(name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; 