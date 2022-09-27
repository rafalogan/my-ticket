export const categoryWithChildren = `WITH RECURSIVE subcategories (id) as (
    SELECT id FROM categories WHERE id = ?
    UNION ALL
    SELECT c.id FROM subcategories, categories c
    WHERE parentId = subcategories.id
)
SELECT id FROM subcategories`;

export const rulesByUser = (userId: number) => `SELECT r.*
FROM rules as r
INNER JOIN ( SELECT rule_id FROM users_rules WHERE user_id = ${userId})
    AS ur ON r.id = ur.rule_id`;

export const rulesByProfiles = (profileId: number) => `SELECT  r.id, r.name, r.description
  FROM rules as r
 INNER JOIN (SELECT rule_id FROM profiles_rules WHERE profile_id = ${profileId}) AS pr ON pr.rule_id = r.id`;
