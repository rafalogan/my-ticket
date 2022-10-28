export const categoryWithChildren = `WITH RECURSIVE subcategories (id) as (
    SELECT id FROM categories WHERE id = ?
    UNION ALL
    SELECT c.id FROM subcategories, categories c
    WHERE parent_id = subcategories.id
)
SELECT id FROM subcategories`;

const parserFieldsCategory = (fields: string[]) => fields.map(f => f.replace('parent_id as ', '').replace('user_id as ', '')).join(', ');

export const categoryWithChildrens = (fields: string[], where = 'id') => `WITH RECURSIVE subcategories (${parserFieldsCategory(
	fields
)}) as (
	SELECT * FROM categories WHERE ${where} = ?
	UNION ALL
SELECT c. * FROM subcategories, categories c
WHERE parent_id = subcategories.id
)
SELECT ${parserFieldsCategory(fields)} FROM subcategories`;

export const eventsQuery = (fields: string[], limit: number, page: number, orderBy?: string, sequence?: string) => `SELECT ${fields.join(
	', '
)}
FROM events as e
LEFt OUTER JOIN ( SELECT * FROM files)
    AS f ON f.event_id = e.id AND f.location = 'poster'
    ORDER BY ${orderBy || 'e.id'} ${sequence || 'ASC'}
    LIMIT ${limit}
    OFFSET ${page * limit - limit}`;

export const rulesByProfiles = (profileId: number) => `SELECT  r.id, r.name, r.description
  FROM rules as r
 INNER JOIN (SELECT rule_id FROM profiles_rules WHERE profile_id = ${profileId}) AS pr ON pr.rule_id = r.id`;
