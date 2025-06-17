import db from '../config/db';
import { User } from '../types/user';

export const findAll = async (): Promise<User[]> => {
    return db<User>('users').select(['id', 'username', 'email']);
};

export const create = async (user:User) => {
    const [newUser] = await db<User>('users')
        .insert(user)
        .returning(['id', 'username','name', 'email']);
    return newUser;
}

export const login = async(username: string) => {
    return db<User>('users').select(['id', 'username', 'password', 'name', 'email', 'role']).where("username", username).first();
}