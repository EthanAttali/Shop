import knex from 'knex';
import * as userModel from '../models/user.model';
import {User} from '../types/user';

export const getAllUsers = async(): Promise<User[]> => {
    return await userModel.findAll();
}

export const getUserById = async(id: number) => {
    return await userModel.getUserById(id);
}

export const createUser = async (data:User) => {
    return await userModel.create(data);
}

export const getUserByUserName = async(username: string) => {
    return await userModel.login(username);
}

export const updatePersonalInfos = async(user: User) => {
    return await userModel.update(user.id!, user)
}