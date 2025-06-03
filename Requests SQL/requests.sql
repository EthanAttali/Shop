select prod.id, product_name, prod.description, price, stock, image_path,
	cat.name, cat.description,
	ROUND(price * (1 - percentage)) as new_price
from products as prod 
inner join categories as cat on prod.category_id = cat.id
left join discounts as dis on dis.category_id = cat.id
AND NOW() between dis.starts_at and dis.ends_at