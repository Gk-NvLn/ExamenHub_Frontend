-- Initialisation de la base de données "exam_hub"
CREATE TYPE user_role AS ENUM ('admin', 'student');
CREATE TABLE users (
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(150) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
role user_role NOT NULL,
is_active BOOLEAN DEFAULT TRUE NOT NULL
);
CREATE TABLE courses (
id SERIAL PRIMARY KEY,
code VARCHAR(50) UNIQUE NOT NULL, -- ex: "DEV001"
name VARCHAR(150) NOT NULL,
description TEXT
);
CREATE TABLE exams (
id SERIAL PRIMARY KEY,
course_id INT REFERENCES courses(id) ON DELETE RESTRICT, -- RG-09: Interdit la
suppression du cours s'il a un examen
title VARCHAR(150) NOT NULL,
description TEXT,
start_time TIMESTAMP WITH TIME ZONE NOT NULL,
end_time TIMESTAMP WITH TIME ZONE NOT NULL
);
CREATE TABLE questions (
id SERIAL PRIMARY KEY,
exam_id INT REFERENCES exams(id) ON DELETE CASCADE,
wording TEXT NOT NULL,
points INT NOT NULL DEFAULT 1
);
CREATE TABLE choices (
id SERIAL PRIMARY KEY,
question_id INT REFERENCES questions(id) ON DELETE CASCADE,
text TEXT NOT NULL,
is_correct BOOLEAN NOT NULL DEFAULT FALSE
);
CREATE TABLE attempts (
id SERIAL PRIMARY KEY,
student_id INT REFERENCES users(id) ON DELETE RESTRICT,
exam_id INT REFERENCES exams(id) ON DELETE RESTRICT, -- RG-09: Interdit la
suppression de l'examen s'il a des tentatives
score INT DEFAULT 0,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT
NULL,
CONSTRAINT unique_student_exam UNIQUE (student_id, exam_id) -- RG-02: Garantie
d'unicité physique en BDD
);
CREATE TABLE student_answers (
id SERIAL PRIMARY KEY,
attempt_id INT REFERENCES attempts(id) ON DELETE CASCADE,
question_id INT REFERENCES questions(id) ON DELETE RESTRICT,
choice_id INT REFERENCES choices(id) ON DELETE RESTRICT
);
-- Index pour optimiser les performances des requêtes fréquentes
CREATE INDEX idx_exams_dates ON exams (start_time, end_time);
CREATE INDEX idx_attempts_student_exam ON attempts (student_id, exam_id);