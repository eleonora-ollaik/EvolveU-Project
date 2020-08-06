SELECT *
FROM quiz
INNER JOIN theme
ON quiz.theme_id = theme.theme_id;

SELECT * FROM
(SELECT *
FROM quiz
INNER JOIN theme
ON quiz.theme_id = theme.theme_id) as ct1
INNER JOIN question
on ct1.quiz_id = question.quiz_id;

SELECT * FROM
(SELECT *
FROM quiz
INNER JOIN theme
ON quiz.theme_id = theme.theme_id) as ct1
INNER JOIN 
(SELECT *
FROM question
INNER JOIN questiontype
ON question.questiontype_id = questiontype.questiontype_id) as ct2
on ct1.quiz_id = ct2.quiz_id;

SELECT * FROM
(SELECT *
FROM quiz
INNER JOIN theme
ON quiz.theme_id = theme.theme_id) as ct1
INNER JOIN 
(SELECT *
FROM  
(SELECT *
FROM question
INNER JOIN answer
ON question.question_id = answer.question_id) as ct3
INNER JOIN questiontype
ON ct3.questiontype_id = questiontype.questiontype_id) as ct2
on ct1.quiz_id = ct2.quiz_id;

SELECT * FROM
(SELECT *
FROM quiz
INNER JOIN theme
ON quiz.theme_id = theme.theme_id WHERE quiz_id = 1) as ct1
INNER JOIN 
(SELECT *
FROM  
(SELECT *
FROM question
INNER JOIN answer
ON question.question_id = answer.question_id) as ct3
INNER JOIN questiontype
ON ct3.questiontype_id = questiontype.questiontype_id) as ct2
on ct1.quiz_id = ct2.quiz_id;