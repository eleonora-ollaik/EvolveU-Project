UPDATE theme SET theme_name = 'History101', theme_update = now() WHERE theme_id = 2 RETURNING *
UPDATE quiz SET theme_id = 3, quiz_update = now() WHERE quiz_id = 1 RETURNING *

UPDATE quiz
SET quiz_name = 
(
    CASE 
    WHEN quiz_id = 13 then 'SET 1'
    WHEN quiz_id = 14 then 'SET 2'
    WHEN quiz_id = 15 then 'SET 3'
    END
),
theme_id = 
(
    CASE 
    WHEN quiz_id = 13 then 2
    WHEN quiz_id = 14 then 2
    WHEN quiz_id = 15 then 2
    END
),
quiz_update = now()
WHERE quiz_id  in (13,14,15)