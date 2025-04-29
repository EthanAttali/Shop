import {Request, Response} from 'express';
import * as userService from '../services/user.service';
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');

const maxAge = 3*24*60*60*1000

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

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try{
        const {name, email, password, username} = req.body;
        if(!name || !email || !password){
            res.status(400).json({error: 'Name, email and password required'});
            return;
        }
        const saltRounds = 10;
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