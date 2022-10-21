SELECT u. *, p. *
FROM users as u, profiles as p
INNER JOIN (SELECT * FROM files WHERE user_id = 1)
AS f ON f.user_id = 1
WHERE u.id = 1
AND p.id =  u.profile_id;

SELECT *
FROM places
WHERE user_id = 1
