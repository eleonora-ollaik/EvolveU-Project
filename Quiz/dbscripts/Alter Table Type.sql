ALTER TABLE answer
ALTER COLUMN answer_creation TYPE timestamptz,
ALTER COLUMN answer_update TYPE timestamptz;
SELECT * FROM answer