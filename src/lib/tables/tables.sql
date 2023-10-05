CREATE TABLE User ( id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(50) NOT NULL, email VARCHAR(50) UNIQUE NOT NULL, password VARCHAR(50) NOT NULL, type ENUM('student', 'admin', 'tutor') NOT NULL );

CREATE TABLE Course ( id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(50) NOT NULL, description VARCHAR(200) NOT NULL, timetable VARCHAR(200) NOT NULL );

CREATE TABLE Tutor_Course ( id INT PRIMARY KEY AUTO_INCREMENT, tutor_id INT NOT NULL, course_id INT NOT NULL, FOREIGN KEY (tutor_id) REFERENCES User(id), FOREIGN KEY (course_id) REFERENCES Course(id) );

 CREATE TABLE Enrollment ( id INT PRIMARY KEY AUTO_INCREMENT,student_id INT NOT NULL, course_id INT NOT NULL,  FOREIGN KEY (student_id) REFERENCES User(id), FOREIGN KEY (course_id) REFERENCES Course(id) );

CREATE TABLE Attendance ( id INT PRIMARY KEY AUTO_INCREMENT, student_id INT NOT NULL, course_id INT NOT NULL, session_date DATE NOT NULL, status ENUM('present', 'absent','late') NOT NULL, FOREIGN KEY (student_id) REFERENCES User(id), FOREIGN KEY (course_id) REFERENCES Course(id) );

CREATE TABLE Question ( id INT PRIMARY KEY AUTO_INCREMENT, content VARCHAR(200) NOT NULL, submit_time DATETIME NOT NULL, student_id INT NOT NULL, course_id INT NOT NULL, FOREIGN KEY (student_id) REFERENCES User(id), FOREIGN KEY (course_id) REFERENCES Course(id) );

CREATE TABLE Answer ( id INT PRIMARY KEY AUTO_INCREMENT, content VARCHAR(200) NOT NULL, response_time DATETIME NOT NULL, tutor_id INT NOT NULL, question_id INT NOT NULL,  FOREIGN KEY (tutor_id) REFERENCES User(id), FOREIGN KEY (question_id) REFERENCES Question(id) );

 CREATE TABLE Survey ( id INT PRIMARY KEY AUTO_INCREMENT, student_id INT NOT NULL, course_id INT NOT NULL, rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5), feedback VARCHAR(200) NOT NULL, FOREIGN KEY (student_id) REFERENCES User(id), FOREIGN KEY (course_id) REFERENCES Course(id) );