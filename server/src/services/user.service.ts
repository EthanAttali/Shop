import knex from 'knex';
import * as userModel from '../models/user.model';
import {User} from '../types/user';

export const getAllUsers = async(): Promise<User[]> => {
    return await userModel.findAll();
}

export const createUser = async (data:User) => {
    return await userModel.create(data);
}

export const getUserByUserName = async(username: string) => {
    return await userModel.login(username);
}