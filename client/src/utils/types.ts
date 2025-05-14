export interface Product{
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category_id: number;
    category_name: string;
    percentage_discount: number;
}