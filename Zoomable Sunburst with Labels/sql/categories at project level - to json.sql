select coalesce(jsonb_agg(row_to_json(b)), '[]')
from (
  SELECT  (SELECT name      FROM ocean.category     WHERE id = a.category_id) as name,
          size
  FROM
    (
      SELECT
        category_id,
        count(*) AS size
      FROM ocean.bim_model_object
      WHERE company_id = 36 AND project_id = 254 AND project_bim_model_id = 248
      GROUP BY company_id, project_id, project_bim_model_id, category_id
    ) a
) b;