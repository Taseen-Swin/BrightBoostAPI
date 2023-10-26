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
    ('Sophia Clark', 'sophia@example.com', 'sophiaPass', 'student');

-- Dummy data for the Course table
INSERT INTO Course (name, description, session_day, session_slot)
VALUES
    ('Chemistry 101', 'Basic Chemistry', 'Tuesday', '10:00 AM - 11:30 AM'),
    ('Physics 301', 'Quantum Mechanics', 'Thursday', '2:00 PM - 3:30 PM'),
    ('Math 201', 'Calculus II', 'Monday', '1:00 PM - 2:30 PM'),
    ('Psychology 101', 'Introduction to Psychology', 'Friday', '3:00 PM - 4:30 PM'),
    ('Art 202', 'Oil Painting Workshop', 'Wednesday', '9:00 AM - 10:30 AM'),
    ('Music 101', 'Music Appreciation', 'Tuesday', '1:30 PM - 3:00 PM'),
    ('Biology 201', 'Genetics', 'Thursday', '10:00 AM - 11:30 AM'),
    ('Computer Science 101', 'Introduction to Programming', 'Friday', '3:30 PM - 5:00 PM'),
    ('History 101', 'World History: Ancient Civilizations', 'Monday', '10:30 AM - 12:00 PM'),
    ('English 201', 'Shakespearean Literature', 'Wednesday', '2:30 PM - 4:00 PM');

-- Dummy data for the Session table
INSERT INTO Session (course_id, session_date, isactive)
VALUES
    (1, '2023-10-30 10:00:00', 1),
    (2, '2023-10-31 14:00:00', 1),
    (3, '2023-11-01 13:00:00', 1),
    (4, '2023-11-02 15:00:00', 0),
    (5, '2023-11-03 09:00:00', 1),
    (6, '2023-11-06 13:30:00', 1),
    (7, '2023-11-07 10:00:00', 0),
    (8, '2023-11-08 15:30:00', 1),
    (9, '2023-11-09 10:30:00', 1),
    (10, '2023-11-10 14:30:00', 0);

-- Dummy data for the Tutor_Course table
INSERT INTO Tutor_Course (tutor_id, course_id)
VALUES
    (3, 1),
    (3, 2),
    (3, 3),
    (8, 4),
    (8, 5),
    (8, 6),
    (5, 7),
    (5, 8),
    (5, 9),
    (7, 10);

-- Dummy data for the Enrollment table
INSERT INTO Enrollment (student_id, course_id)
VALUES
    (10, 1),
    (10, 2),
    (10, 3),
    (7, 4),
    (8, 5),
    (9, 6),
    (4, 7),
    (5, 8),
    (6, 9),
    (1, 10);

-- Dummy data for the Attendance table
INSERT INTO Attendance (student_id, session_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 6),
    (7, 7),
    (8, 8),
    (9, 9),
    (10, 10);

-- Dummy data for the Question table
INSERT INTO Question (content, submit_time, student_id, session_id)
VALUES
    ('I have a question about chemical reactions.', '2023-10-31 11:30:00', 10, 1),
    ('Can you explain quantum entanglement?', '2023-11-01 14:00:00', 10, 2),
    ('I need help with calculus integration.', '2023-11-02 13:00:00', 10, 3),
    ('What are the key concepts in psychology?', '2023-11-03 15:00:00', 7, 4),
    ('How do I mix oil paints for a portrait?', '2023-11-06 09:00:00', 8, 5),
    ('Tell me more about genetics inheritance.', '2023-11-07 13:30:00', 9, 6),
    ('I want to learn Python programming.', '2023-11-08 10:00:00', 4, 7),
    ('Discuss ancient civilizations in history.', '2023-11-09 15:30:00', 5, 8),
    ('Analyzing Shakespearean sonnets.', '2023-11-10 10:30:00', 6, 9),
    ('How does music theory work?', '2023-11-13 14:30:00', 1, 10);

-- Dummy data for the Answer table
INSERT INTO Answer (content, response_time, tutor_id, question_id, session_id)
VALUES
    ('Chemical reactions involve the rearrangement of atoms.', '2023-10-31 12:00:00', 3, 1, 1),
    ('Quantum entanglement is a phenomenon where particles become correlated.', '2023-11-01 14:30:00', 3, 2, 2),
    ('To integrate, use the fundamental theorem of calculus.', '2023-11-02 13:30:00', 8, 3, 3),
    ('Psychology explores behavior and mental processes.', '2023-11-03 15:30:00', 8, 4, 4),
    ('Mixing oil paints requires a good understanding of color theory.', '2023-11-06 09:30:00', 8, 5, 5),
    ('Genetics inheritance follows Mendelian laws.', '2023-11-07 13:45:00', 5, 6, 6),
    ('Python is a versatile programming language for various applications.', '2023-11-08 10:30:00', 5, 7, 7),
    ('Ancient civilizations include the Egyptians and Mesopotamians.', '2023-11-09 15:45:00', 5, 8, 8),
    ('Shakespearean sonnets often explore themes of love and beauty.', '2023-11-10 10:45:00', 7, 9, 9),
    ('Music theory covers scales, chords, and musical structure.', '2023-11-13 14:45:00', 7, 10, 10);
