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

export enum ROLE {
    VIEWER = "VIEWER", 
    ADMIN = "ADMIN"
}

export interface User {
    id: number;
    username: string;
    name: string;
    email: string;
    role: ROLE
}

export interface PersonalUserInfo {
    username: string;
    password: string;
    name: string;
    email: string;
}