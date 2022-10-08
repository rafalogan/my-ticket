export const categoryWithChildren = `WITH RECURSIVE subcategories (id) as (
    SELECT id FROM categories WHERE id = ?
    UNION ALL
    SELECT c.id FROM subcategories, categories c
    WHERE parent_id = subcategories.id
)
SELECT id FROM subcategories`;

const parserFildsCategory = (fields: string[]) => fields.map(f => f.replace('parent_id as ', '').replace('user_id as ', '')).join(', ');

export const categoryWithChildrens = (fields: string[], where = 'id') => `WITH RECURSIVE subcategories (${parserFildsCategory(fields)}) as (
	SELECT * FROM categories WHERE ${where} = ?
	UNION ALL
SELECT c. * FROM subcategories, categories c
WHERE parent_id = subcategories.id
)
SELECT ${parserFildsCategory(fields)} FROM subcategories`;

export const rulesByUser = (userId: number) => `SELECT r.*
FROM rules as r
INNER JOIN ( SELECT rule_id FROM users_rules WHERE user_id = ${userId})
    AS ur ON r.id = ur.rule_id`;

export const rulesByProfiles = (profileId: number) => `SELECT  r.id, r.name, r.description
  FROM rules as r
 INNER JOIN (SELECT rule_id FROM profiles_rules WHERE profile_id = ${profileId}) AS pr ON pr.rule_id = r.id`;
