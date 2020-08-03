UPDATE theme SET theme_name = 'History101', theme_update = now() WHERE theme_id = 2 RETURNING *
UPDATE quiz SET theme_id = 3, quiz_update = now() WHERE quiz_id = 1 RETURNING *