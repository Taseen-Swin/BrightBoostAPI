-- Drop the schema if it exists
DROP SCHEMA IF EXISTS brightboost_db;

-- Create the schema
CREATE SCHEMA brightboost_db;

-- Use the schema
USE brightboost_db;

CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    type ENUM('student', 'admin', 'tutor') NOT NULL
);



CREATE TABLE Course (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(200) NOT NULL,
    session_day VARCHAR(200) NULL,
    session_slot VARCHAR(200) NULL
);

CREATE TABLE Session (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT NOT NULL,
    session_date DATETIME NOT NULL,
    isactive BIT DEFAULT 0,
    FOREIGN KEY (course_id) REFERENCES Course(id)
);



CREATE TABLE Tutor_Course (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tutor_id INT NOT NULL,
    course_id INT NOT NULL,
    FOREIGN KEY (tutor_id) REFERENCES User(id),
    FOREIGN KEY (course_id) REFERENCES Course(id)
);

CREATE TABLE Enrollment (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    created_at DATETIME,
    FOREIGN KEY (student_id) REFERENCES User(id),
    FOREIGN KEY (course_id) REFERENCES Course(id)
);

CREATE TABLE Attendance (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    session_id INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES User(id),
    FOREIGN KEY (session_id) REFERENCES Session(id)
);

CREATE TABLE Question (
    id INT PRIMARY KEY AUTO_INCREMENT,
    content VARCHAR(200) NOT NULL,
    submit_time DATETIME NOT NULL,
    student_id INT NOT NULL,
    session_id INT,
    FOREIGN KEY (student_id) REFERENCES User(id),
    FOREIGN KEY (session_id) REFERENCES Session(id)
);

CREATE TABLE Answer (
    id INT PRIMARY KEY AUTO_INCREMENT,
    content VARCHAR(200) NOT NULL,
    response_time DATETIME NOT NULL,
    tutor_id INT NOT NULL,
    question_id INT NOT NULL,
    session_id INT,
    FOREIGN KEY (tutor_id) REFERENCES User(id),
    FOREIGN KEY (question_id) REFERENCES Question(id),
    FOREIGN KEY (session_id) REFERENCES Session(id)
);

CREATE TABLE Survey (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    feedback VARCHAR(200) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES User(id),
    FOREIGN KEY (course_id) REFERENCES Course(id)
);


INSERT INTO User (name, email, password, type)
VALUES
    ('John Doe', 'john@example.com', 'pass123', 'student'),
    ('Sarah Miller', 'sarah@example.com', 'sarahPass', 'student'),
    ('Michael Smith', 'michael@example.com', 'mike123', 'tutor'),
    ('Laura Johnson', 'laura@example.com', 'lauraPass', 'student'),
    ('Alex Turner', 'alex@example.com', 'alex123', 'tutor'),
    ('Olivia Brown', 'olivia@example.com', 'oliviaPass', 'student'),
    ('William White', 'will@example.com', 'williamPass', 'tutor'),
    ('Emma Taylor', 'emma@example.com', 'emmaPass', 'student'),
    ('James Anderson', 'james@example.com', 'james123', 'admin'),
    ('Sophia Clark', 'sophia@example.com', 'sophiaPass', 'student'),
    ('Alice Davis', 'alice@example.com', 'alice123', 'student'),
    ('Daniel Wilson', 'daniel@example.com', 'danielPass', 'student'),
    ('Grace Moore', 'grace@example.com', 'grace123', 'tutor'),
    ('Thomas Hall', 'thomas@example.com', 'thomasPass', 'student'),
    ('Nora Baker', 'nora@example.com', 'noraPass', 'tutor'),
    ('Ethan Turner', 'ethan@example.com', 'ethanPass', 'student'),
    ('Ava Walker', 'ava@example.com', 'avaPass', 'tutor'),
    ('Mason Harris', 'mason@example.com', 'masonPass', 'student'),
    ('Lily Lewis', 'lily@example.com', 'lilyPass', 'student'),
    ('Benjamin Turner', 'benjamin@example.com', 'benjaminPass', 'student'),
    ('Zoe Moore', 'zoe@example.com', 'zoePass', 'student'),
    ('Liam Foster', 'liam@example.com', 'liamPass', 'student'),
    ('Harper Wright', 'harper@example.com', 'harperPass', 'student'),
    ('Logan Mitchell', 'logan@example.com', 'loganPass', 'student'),
    ('Avery Green', 'avery@example.com', 'averyPass', 'student'),
    ('Evelyn King', 'evelyn@example.com', 'evelynPass', 'student'),
    ('Jackson Turner', 'jackson@example.com', 'jacksonPass', 'student'),
    ('Scarlett Allen', 'scarlett@example.com', 'scarlettPass', 'student'),
    ('Carter Bennett', 'carter@example.com', 'carterPass', 'student'),
    ('Madison Parker', 'madison@example.com', 'madisonPass', 'student');




-- Dummy data for the Course table
INSERT INTO Course (name, description, session_day, session_slot)
VALUES
    ('Chemistry 101', 'Basic Chemistry', 'Tuesday', '4:30 PM - 5:00 PM'),
    ('Physics 301', 'Quantum Mechanics', 'Thursday', '3:30 PM - 5:00 PM'),
    ('Math 201', 'Calculus II', 'Monday', '3:30 PM - 5:00 PM'),
    ('Psychology 101', 'Introduction to Psychology', 'Friday', '3:30 PM - 5:00 PM'),
    ('Art 202', 'Oil Painting Workshop', 'Wednesday', '4:30 PM - 5:00 PM'),
    ('Music 101', 'Music Appreciation', 'Tuesday', '3:30 PM - 5:00 PM'),
    ('Biology 201', 'Genetics', 'Thursday', '3:30 PM - 5:00 PM'),
    ('Computer Science 101', 'Introduction to Programming', 'Friday', '3:30 PM - 4:00 PM'),
    ('History 101', 'World History: Ancient Civilizations', 'Monday', '4:30 PM - 5:00 PM'),
    ('English 201', 'Shakespearean Literature', 'Wednesday', '3:30 PM - 5:00 PM'),
    ('Cloud Architecture 401', 'Modern Designs', 'Friday', '3:30 PM - 5:00 PM'),
    ('Big Data 201', 'Data Analytics With Python', 'Monday', '4:30 PM - 5:00 PM'),
    ('Machine Learning 501', 'Machine Analytics', 'Tuesday', '3:30 PM - 5:00 PM');


-- Dummy data for the Session table
INSERT INTO Session (course_id, session_date, isactive)
VALUES
    (1, '2023-10-30 10:00:00', 0),
    (2, '2023-10-31 14:00:00', 0),
    (3, '2023-11-01 13:00:00', 0),
    (4, '2023-11-02 15:00:00', 0),
    (5, '2023-11-03 09:00:00', 0),
    (6, '2023-11-06 13:30:00', 0),
    (7, '2023-11-07 10:00:00', 0),
    (8, '2023-11-08 15:30:00', 0),
    (9, '2023-11-09 10:30:00', 0),
    (10, '2023-11-10 14:30:00', 0),   
    (11, '2023-11-11 18:30:00', 0),    
    (12, '2023-11-12 14:30:00', 0),    
    (13, '2023-11-13 12:30:00', 0);    



-- Dummy data for the Tutor_Course table
INSERT INTO Tutor_Course (tutor_id, course_id)
VALUES
    (3, 1),
    (3, 2),
    (3, 3),
    (5, 4),
    (5, 5),
    (5, 6),
    (5, 7),
    (7, 8),
    (7, 9),
    (13, 4),
    (15, 11),
    (15, 12),
    (15, 8),
    (15, 11),
    (15, 3),
    (17, 9),
    (17, 1);

-- Dummy data for the Enrollment table
INSERT INTO Enrollment (student_id, course_id,created_at)
VALUES
  (4, 10, '2023-01-25 12:00:00'),
(6, 4, '2023-01-09 12:00:00'),
(6, 3, '2023-01-12 12:00:00'),
(6, 8, '2023-01-03 12:00:00'),
(8, 8, '2023-01-08 12:00:00'),
(8, 10, '2023-01-28 12:00:00'),
(8, 12, '2023-08-24 12:00:00'),
(10, 11, '2023-07-16 12:00:00'),
(10, 10, '2023-04-05 12:00:00'),
(10, 3, '2023-03-11 12:00:00'),
(11, 1, '2023-02-18 12:00:00'),
(11, 10, '2023-11-20 12:00:00'),
(12, 5, '2023-06-06 12:00:00'),
(12, 6, '2023-05-02 12:00:00'),
(12, 8, '2023-04-26 12:00:00'),
(12, 9, '2023-01-30 12:00:00'),
(14, 11, '2023-01-13 12:00:00'),
(14, 6, '2023-03-17 12:00:00'),
(14, 5, '2023-01-01 12:00:00'),
(16, 12, '2023-01-07 12:00:00'),
(16, 7, '2023-01-27 12:00:00'),
(16, 9, '2023-04-22 12:00:00'),
(18, 6, '2023-02-25 12:00:00'),
(18, 8, '2023-01-28 12:00:00'),
(18, 5, '2023-06-03 12:00:00'),
(18, 11, '2023-01-22 12:00:00'),
(18, 10, '2023-01-13 12:00:00'),
(18, 1, '2023-09-04 12:00:00'),
(18, 6, '2023-01-11 12:00:00'),
(19, 11, '2023-01-20 12:00:00'),
(19, 5, '2023-01-06 12:00:00'),
(19, 1, '2023-01-03 12:00:00'),
(19, 11, '2023-01-21 12:00:00'),
(20, 7, '2023-01-08 12:00:00'),
(20, 11, '2023-01-09 12:00:00'),
(21, 8, '2023-01-24 12:00:00'),
(21, 13, '2023-01-23 12:00:00'),
(22, 12, '2023-01-12 12:00:00'),
(22, 1, '2023-01-15 12:00:00'),
(22, 7, '2023-01-17 12:00:00'),
(22, 9, '2023-01-26 12:00:00'),
(23, 10, '2023-01-30 12:00:00'),
(23, 3, '2023-01-28 12:00:00'),
(23, 2, '2023-10-14 12:00:00'),
(23, 4, '2023-11-29 12:00:00'),
(23, 8, '2023-09-04 12:00:00'),
(24, 5, '2023-01-23 12:00:00'),
(24, 11, '2023-04-09 12:00:00'),
(25, 6, '2023-01-06 12:00:00'),
(25, 5, '2023-01-12 12:00:00'),
(25, 3, '2023-01-18 12:00:00'),
(26, 1, '2023-03-02 12:00:00'),
(26, 4, '2023-01-26 12:00:00'),
(27, 10, '2023-01-01 12:00:00'),
(27, 4, '2023-01-13 12:00:00'),
(27, 6, '2023-05-22 12:00:00'),
(27, 11, '2023-01-20 12:00:00'),
(28, 8, '2023-01-07 12:00:00'),
(28, 3, '2023-09-24 12:00:00'),
(28, 7, '2023-01-25 12:00:00'),
(29, 9, '2023-08-23 12:00:00'),
(29, 7, '2023-01-04 12:00:00'),
(29, 5, '2023-01-18 12:00:00'),
(29, 1, '2023-07-07 12:00:00'),
(29, 2, '2023-01-01 12:00:00'),
(29, 7, '2023-01-28 12:00:00'),
(30, 12, '2023-06-22 12:00:00'),
(30, 7, '2023-01-15 12:00:00'),
(30, 13, '2023-04-03 12:00:00');


-- Dummy data for the Attendance table
INSERT INTO Attendance (student_id, session_id)
VALUES
    (1, 1),
    (2, 2),
    (4, 4),
    (6, 6),
    (8, 8),
    (10, 10),
    (10, 2),
    (10, 3),
    (11, 11),
    (12, 12),
    (14, 13),
    (15, 12),
    (16, 11),
    (17, 10),
    (18, 8),
    (21, 6),
    (22, 4),
    (23, 2),
    (24, 1),
    (25, 2),
    (27, 4),
    (28, 6),
    (29, 8),
    (30, 10);

-- Dummy data for the Question table
INSERT INTO Question (content, submit_time, student_id, session_id)
VALUES
    ('I have a question about chemical reactions.', '2023-10-31 11:30:00', 1, 1),
    ('Can you explain quantum entanglement?', '2023-11-01 14:00:00', 10, 2),
    ('I need help with calculus integration.', '2023-11-02 13:00:00', 10, 3),
    ('What are the key concepts in psychology?', '2023-11-03 15:00:00', 22, 4),
    ('How do I mix oil paints for a portrait?', '2023-11-06 09:00:00', 8, 8),
    ('Tell me more about genetics inheritance.', '2023-11-07 13:30:00', 6, 6),
    ('I want to learn Python programming.', '2023-11-08 10:00:00', 17, 10),
    ('Discuss ancient civilizations in history.', '2023-11-09 15:30:00', 15, 12),
    ('Analyzing Shakespearean sonnets.', '2023-11-10 10:30:00', 16, 11),
    ('How does music theory work?', '2023-11-13 14:30:00', 23, 2);

-- Dummy data for the Answer table
INSERT INTO Answer (content, response_time, tutor_id, question_id, session_id)
VALUES
    ('Chemical reactions involve the rearrangement of atoms.', '2023-10-31 12:00:00', 3, 1, 1),
    ('Quantum entanglement is a phenomenon where particles become correlated.', '2023-11-01 14:30:00', 3, 2, 2),
    ('To integrate, use the fundamental theorem of calculus.', '2023-11-02 13:30:00', 8, 3, 3),
    ('Psychology explores behavior and mental processes.', '2023-11-03 15:30:00', 8, 4, 4),
    ('Mixing oil paints requires a good understanding of color theory.', '2023-11-06 09:30:00', 8, 5, 8),
    ('Genetics inheritance follows Mendelian laws.', '2023-11-07 13:45:00', 5, 6, 6),
    ('Python is a versatile programming language for various applications.', '2023-11-08 10:30:00', 5, 7, 10),
    ('Ancient civilizations include the Egyptians and Mesopotamians.', '2023-11-09 15:45:00', 5, 8, 12),
    ('Shakespearean sonnets often explore themes of love and beauty.', '2023-11-10 10:45:00', 7, 9, 11),
    ('Music theory covers scales, chords, and musical structure.', '2023-11-13 14:45:00', 7, 10, 2);