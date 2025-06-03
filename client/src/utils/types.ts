export interface Product{
    id: number;
    product_name: string;
    description: string;
    price: number;
    stock: number;
    image_path: string;
    category_name: string;
    newprice: null | number;
}

export enum CATEGORIES {
    SHOES = 'shoes', 
    CAPS = 'caps',
    WATCHES = 'watches',
    TEESHIRTS = 'tee-shirts',
    ALL = 'all' 
}