SELECT u. *, p. *
FROM users as u, profiles as p
INNER JOIN (SELECT * FROM files WHERE user_id = 1)
AS f ON f.user_id = 1
WHERE u.id = 1
AND p.id =  u.profile_id;

SELECT *
FROM places
WHERE user_id = 1;

SELECT e. *, f.*
FROM events as e
INNER JOIN (SELECT * FROM files)
AS f ON f.event_id = e.id;

SELECT * FROM events as e
LEFT JOIN (select * from files) as f on f.event_id = e.id
order by e.id ASC
Limit 10
offset 0
