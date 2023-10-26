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

-- CREATE TABLE Session_Tutor (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     session_id INT NOT NULL,
--     tutor_id INT NOT NULL,
--     FOREIGN KEY (session_id) REFERENCES Session(id),
--     FOREIGN KEY (tutor_id) REFERENCES User(id)
-- );


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
VALUES ('Taseen','taseen@gmail.com','qwerty', 'admin');

INSERT INTO User (name, email, password, type)
VALUES ('Pat','pat@gmail.com','qwerty', 'tutor');

INSERT INTO User (name, email, password, type)
VALUES ('Ryan','ryan@gmail.com','qwerty', 'tutor');

INSERT INTO User (name, email, password, type)
VALUES ('Dev','dev@gmail.com','qwerty', 'student');

INSERT INTO User (name, email, password, type)
VALUES
    ('Alice Johnson', 'alice@example.com', 'password123', 'student'),
    ('Bob Smith', 'bob@example.com', 'securePass', 'student'),
    ('Charlie Brown', 'charlie@example.com', '12345pass', 'admin'),
    ('David Davis', 'david@example.com', 'userPass', 'tutor'),
    ('Eve Williams', 'eve@example.com', 'test1234', 'student'),
    ('Frank Wilson', 'frank@example.com', 'passWord321', 'student'),
    ('Grace Lee', 'grace@example.com', 'secretPass', 'tutor'),
    ('Hannah Harris', 'hannah@example.com', 'hannah123', 'student'),
    ('Ivy Taylor', 'ivy@example.com', 'welcomePass', 'admin'),
    ('Jack Robinson', 'jack@example.com', 'pass1234', 'student');

INSERT INTO Course (name, description, session_day, session_slot)
VALUES
    ('Math 101', 'Introduction to Algebra', 'Monday', '10:00 AM - 11:30 AM'),
    ('History 202', 'World History: The Modern Era', 'Wednesday', '2:00 PM - 3:30 PM'),
    ('Computer Science 301', 'Advanced Data Structures', 'Tuesday', '1:00 PM - 2:30 PM'),
    ('English 105', 'Creative Writing Workshop', 'Thursday', '3:00 PM - 4:30 PM'),
    ('Physics 201', 'Classical Mechanics', 'Friday', '9:00 AM - 10:30 AM'),
    ('Biology 110', 'Introduction to Biology', 'Monday', '1:30 PM - 3:00 PM'),
    ('Chemistry 202', 'Organic Chemistry', 'Wednesday', '10:00 AM - 11:30 AM'),
    ('Art 101', 'Fundamentals of Drawing', 'Tuesday', '3:30 PM - 5:00 PM'),
    ('Music 202', 'Music Theory', 'Thursday', '10:30 AM - 12:00 PM'),
    ('Psychology 301', 'Abnormal Psychology', 'Friday', '2:30 PM - 4:00 PM');

INSERT INTO Tutor_Course (tutor_id, course_id)
VALUES
    (2, 1), -- Pat tutors Math 101
    (2, 2), -- Pat tutors History 202
    (3, 3), -- Ryan tutors Computer Science 301
    (3, 4), -- Ryan tutors English 105
    (19, 5), -- Charlie tutors Physics 201
    (20, 6), -- David tutors Biology 110
    (23, 7), -- Grace tutors Chemistry 202
    (25, 8), -- Ivy tutors Art 101
    (19, 9), -- Charlie tutors Music 202
    (20, 10), -- David tutors Psychology 301
    (2, 5), -- Pat tutors Physics 201
    (3, 6), -- Ryan tutors Biology 110
    (19, 8); -- Charlie tutors Art 101    