INSERT INTO quiz (quiz_name, theme_id, quiz_creation, quiz_update) VALUES ('Quiz 1', 1, now(), now()) RETURNING *;

INSERT INTO question (quiz_id, question_category, 
					  questiontype_id, question_statement, 
					  question_correct_entries, question_wrong_entries,
					  question_creation, question_update) 
VALUES
(1, 'History', 1, 'Who is this', 0, 0, now(), now()),
(1, 'Sports', 1, 'Who is the player', 0, 0, now(), now());

INSERT INTO answer (question_id, answer_is_correct, 
					answer_statement, 
					answer_creation, answer_update) 
VALUES 
(1, true, 'chocolate', now(), now()),
(1, false, 'soup', now(), now()),
(1, false, 'rice', now(), now()),
(1, false, 'seafood', now(), now()),
(2, true, 'biology', now(), now()),
(2, false, 'math', now(), now()),
(2, false, 'chemistry', now(), now()),
(2, false, 'engish', now(), now());

INSERT INTO questiontype (questiontype_name, questiontype_input,
						  questiontype_label, correctanswer_label, wronganswer_label,
					      correct_answer_num, wrong_answer_num,
					      questiontype_creation, questiontype_update) 
VALUES
('Multiple Choice', 'text', '', 'Correct answer', 'Wrong answer', 1, 3, now(), now()),
('True or False', 'radio', 'Please select your correct answer:', 'True', 'False', 1, 1, now(), now()),
('Open Ended', 'text', '', 'Correct answer', 'Wrong answer', 4, 0, now(), now());

INSERT INTO theme (theme_name, 
					theme_creation, theme_update) 
VALUES
('History', now(), now()),
('Sports', now(), now()),
('Video Game', now(), now()),
('Trivia', now(), now()),
('Food', now(), now()),
('Science', now(), now()),
('Arts', now(), now());