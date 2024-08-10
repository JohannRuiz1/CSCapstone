-- Create tables
CREATE TABLE college
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE major
(
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    college_id INT,
    FOREIGN KEY (college_id) REFERENCES college (id)
);
CREATE TABLE app_user
(
    id       SERIAL PRIMARY KEY,
    username VARCHAR(50)  NOT NULL,
    password VARCHAR(100) NOT NULL,
    pending  BOOLEAN      NOT NULL,
    role     VARCHAR(50)  NOT NULL DEFAULT 'STUDENT'-- Adding a role field
);

CREATE TABLE lab
(
    id                     SERIAL PRIMARY KEY,
    name                   VARCHAR(255) NOT NULL,
    url                    VARCHAR(255),
    principle_investigator VARCHAR(255),
    major_id               INT,
    description            TEXT,
    FOREIGN KEY (major_id) REFERENCES major (id)
);


CREATE TABLE professor
(
    id         SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name  VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    college_id INT,
    lab_id INT,
    user_id INT NOT NULL,
    FOREIGN KEY (college_id) REFERENCES college(id),
    FOREIGN KEY (lab_id) REFERENCES lab(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES app_user(id) ON DELETE CASCADE
);



CREATE TABLE student
(
    id         SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name  VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    year       VARCHAR(255) NOT NULL, /* freshmen, sophomore, junior, senior, masters, phd */
    major_id   INT,
    about_me   TEXT,
    user_id    INT          NOT NULL,
    FOREIGN KEY (user_id) REFERENCES app_user (id) ON DELETE CASCADE,
    FOREIGN KEY (major_id) REFERENCES major (id)
);

CREATE TABLE posting
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    description TEXT,
    type        VARCHAR(255), /* volunteer, paid, credit*/
    url         VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lab_id      INT,
    FOREIGN KEY (lab_id) REFERENCES lab (id) ON DELETE CASCADE
);

CREATE TABLE discussion
(
    id         SERIAL PRIMARY KEY,
    lab_id     INT,
    student_id INT,
    title      VARCHAR(255) NOT NULL,
    content    TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES student (id) ON DELETE CASCADE,
    FOREIGN KEY (lab_id) REFERENCES lab (id) ON DELETE CASCADE
);

CREATE TABLE comment
(
    id            SERIAL PRIMARY KEY,
    discussion_id INT NOT NULL,
    student_id    INT,
    content       TEXT,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (discussion_id) REFERENCES discussion (id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES student (id) ON DELETE CASCADE
);

CREATE TABLE subscription
(
    student_id INT,
    lab_id     INT,
    PRIMARY KEY (student_id, lab_id),
    FOREIGN KEY (student_id) REFERENCES student (id) ON DELETE CASCADE,
    FOREIGN KEY (lab_id) REFERENCES lab (id) ON DELETE CASCADE
);

/* Authentication */
