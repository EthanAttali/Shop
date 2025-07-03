import {Request, Response} from 'express';
import * as userService from '../services/user.service';
import bcrypt from 'bcrypt';
import { User } from '../types/user';
const jwt = require('jsonwebtoken');

const maxAge = 3*24*60*60*1000
const saltRounds = 10;

const createToken = (id: any) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn :maxAge
    })
}

export const getAllUsers = async(req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    }
    catch(error:any) {
        res.status(500).json({error: error.message});
    }
}

export const getUserById = async(id: number) => {
    try {
        const user = await userService.getUserById(id);
        return user;
    } catch (error) {
        throw new Error('USER NOT EXIST');
    }
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try{
        const {name, email, password, username} = req.body;
        if(!name || !email || !password){
            res.status(400).json({error: 'Name, email and password required'});
            return;
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = await userService.createUser({name, email, password: hashedPassword, username});
        const token = createToken(newUser.id)
        res.status(201).json({user: newUser, token: token});
    }
    catch (err: any) {
        if (err.code === '23505') { // Code PostgreSQL pour clé dupliquée
            res.status(400).json({ error: 'Username or email already exists' });
        } else {
            res.status(500).json({ error: 'Server error' });
        }
    }
}

export const updateUser = async (req:Request, res: Response) => {
    try {
        const {name, email, password, username, id} = req.body;
        if(!id){
            throw new Error('NO ID')
        }
        const actualInfosUser = await getUserById(id);
        if(!actualInfosUser) return res.status(401).json({error: 'USER_NOT_FOUND'});
        const hashedPassword = password ? await bcrypt.hash(password, saltRounds) : actualInfosUser.password;
        const newUser = {
            id: id,
            name: name ?? actualInfosUser.name, 
            email: email ?? actualInfosUser.email,
            username: username ?? actualInfosUser.username,
            password: hashedPassword ?? actualInfosUser.password
        }

        await userService.updatePersonalInfos(newUser);
        return res.status(200).json({message: 'SUCCESSFULLY UPDATED'});
    } catch (error) {
        res.status(500).json({message: 'INTERNAL ERROR'})
    }
}