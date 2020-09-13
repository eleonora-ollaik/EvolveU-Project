DROP TABLE IF EXISTS answer;
CREATE TABLE answer (
   answer_id serial PRIMARY KEY,
   question_id INT NOT NULL,
   answer_is_correct boolean,
   answer_statement VARCHAR,
   answer_creation TIMESTAMPTZ,
   answer_update TIMESTAMPTZ
);

DROP TABLE IF EXISTS question;
CREATE TABLE question (
   question_id serial PRIMARY KEY,
   quiz_id INT NOT NULL,
   question_category VARCHAR,
   questioncategory_id INT, 
   questiontype_id INT NOT NULL,
   question_statement VARCHAR,
   question_correct_entries INT,
   question_wrong_entries INT,
   question_creation TIMESTAMPTZ,
   question_update TIMESTAMPTZ
);

DROP TABLE IF EXISTS questiontype;
CREATE TABLE questiontype (
   questiontype_id serial PRIMARY KEY,
   questiontype_name VARCHAR,
   questiontype_anscomp VARCHAR NOT NULL,
   correct_answer_num INT,
   wrong_answer_num INT,
   questiontype_creation TIMESTAMPTZ,
   questiontype_update TIMESTAMPTZ
);

DROP TABLE IF EXISTS quiz;
CREATE TABLE quiz(
   quiz_id serial PRIMARY KEY,
   quiz_name VARCHAR,
   theme_id INT NOT NULL,
   quiz_creation TIMESTAMPTZ,
   quiz_update TIMESTAMPTZ,
   user_id VARCHAR NOT NULL
);

DROP TABLE IF EXISTS theme;
CREATE TABLE theme(
   theme_id serial PRIMARY KEY,
   theme_name VARCHAR,
   theme_creation TIMESTAMPTZ,
   theme_update TIMESTAMPTZ
);

DROP TABLE IF EXISTS questioncategory;
CREATE TABLE questioncategory (
   questioncategory_id serial PRIMARY KEY,
   questioncategory_name  VARCHAR,
   questioncategory_creation TIMESTAMPTZ,
   questioncategory_update TIMESTAMPTZ
); 

DROP TABLE IF EXISTS users;
CREATE TABLE users (
   user_id serial PRIMARY KEY,
   cognito_id VARCHAR,
   user_email VARCHAR,
   username VARCHAR,
   user_creation TIMESTAMPTZ
); 