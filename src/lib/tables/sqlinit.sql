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
    FOREIGN KEY (course_id) REFERENCES Course(id)
);

CREATE TABLE Session_Tutor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    session_id INT NOT NULL,
    tutor_id INT NOT NULL,
    FOREIGN KEY (session_id) REFERENCES Session(id),
    FOREIGN KEY (tutor_id) REFERENCES User(id)
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
    FOREIGN KEY (student_id) REFERENCES User(id),
    FOREIGN KEY (course_id) REFERENCES Course(id)
);

CREATE TABLE Attendance (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    session_id INT NOT NULL,
    status ENUM('present', 'absent', 'late') NOT NULL,
    FOREIGN KEY (student_id) REFERENCES User(id),
    FOREIGN KEY (session_id) REFERENCES Session(id)
);

CREATE TABLE Question (
    id INT PRIMARY KEY AUTO_INCREMENT,
    content VARCHAR(200) NOT NULL,
    submit_time DATETIME NOT NULL,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    session_id INT,
    FOREIGN KEY (student_id) REFERENCES User(id),
    FOREIGN KEY (course_id) REFERENCES Course(id),
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
