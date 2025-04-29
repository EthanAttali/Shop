export interface User {
    id?: number;
    name: string;
    email: string;
    username: string;
    password: string;
    role?: string;
    created_at?: Date;
}