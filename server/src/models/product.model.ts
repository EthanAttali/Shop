import db from "../config/db";
import { Products } from "../types/products";

// const knex = require('knex');


export const allProducts = (category: string | undefined):Promise<Products[]> => {
    const query = db<Products>('products as prod')
        .select(['prod.id', 'product_name', 'prod.description', 'price', 'stock',
            'image_path', 'cat.name as category_name',
            db.raw('ROUND(prod.price * (1 - COALESCE(dis.percentage, 0)), 2) as newPrice')
        ])
        .innerJoin('categories as cat', 'prod.category_id', 'cat.id')
        .leftJoin('discounts as dis', function (){
            this.on('dis.category_id', '=', 'cat.id')
            .andOn(db.raw('NOW() BETWEEN dis.starts_at AND dis.ends_at'))
        });
        
    if(category){
        query.where('cat.name', category);
    }

    return query;
}

export const specificCategoryProducts = (category: string) => {
    return db<Products>('products as prod')
        .select(['prod.id', 'product_name', 'prod.description', 'price', 'stock',
            'image_path', 'cat.name as category_name',
            db.raw('ROUND(prod.price * (1 - COALESCE(dis.percentage, 0)), 2) as newPrice')
        ])
        .innerJoin('categories as cat', 'prod.category_id', 'cat.id')
        .leftJoin('discounts as dis', function (){
            this.on('dis.category_id', '=', 'cat.id')
            .andOn(db.raw('NOW() BETWEEN dis.starts_at AND dis.ends_at'))
        })
        .where(`cat.name`, category)
}

export const getProductById = (id: number) => {
    return db<Products>('products as prod')
        .select(['prod.id', 'product_name', 'prod.description', 'price', 'stock',
            'image_path', 'cat.name as category_name',
            db.raw('ROUND(prod.price * (1 - COALESCE(dis.percentage, 0)), 2) as newPrice')
        ])
        .innerJoin('categories as cat', 'prod.category_id', 'cat.id')
        .leftJoin('discounts as dis', function (){
            this.on('dis.category_id', '=', 'cat.id')
            .andOn(db.raw('NOW() BETWEEN dis.starts_at AND dis.ends_at'))
        })
        .where(`prod.id`, id)
}

export const getSimilarProducts = (category: string, id: number) => {
    return db<Products>('products as prod')
        .select(['prod.id', 'product_name', 'prod.description', 'price', 'stock',
            'image_path', 'cat.name as category_name',
            db.raw('ROUND(prod.price * (1 - COALESCE(dis.percentage, 0)), 2) as newPrice')
        ])
        .innerJoin('categories as cat', 'prod.category_id', 'cat.id')
        .leftJoin('discounts as dis', function (){
            this.on('dis.category_id', '=', 'cat.id')
            .andOn(db.raw('NOW() BETWEEN dis.starts_at AND dis.ends_at'))
        })
        .where(`cat.name`, category).and.whereNot(`prod.id`, id)
}
// return db<User>('users').select(['id', 'username', 'email']);