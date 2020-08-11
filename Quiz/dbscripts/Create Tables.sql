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
   quiz_update TIMESTAMPTZ
);

DROP TABLE IF EXISTS theme;
CREATE TABLE theme(
   theme_id serial PRIMARY KEY,
   theme_name VARCHAR,
   theme_creation TIMESTAMPTZ,
   theme_update TIMESTAMPTZ
);