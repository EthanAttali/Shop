import {Request, Response} from 'express';
import { getUserByUserName } from '../services/user.service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'supersecretkey';

export const login = async(req: Request, res: Response):Promise<any> => {
    
    try{
        const {username, password} = req.body;
        const user = await getUserByUserName(username);
        if(!user) return res.status(401).json({error: 'USER_NOT_FOUND'});
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) return res.status(401).json({error: 'PASSWORD_INVALID'});

        const token = jwt.sign(
            {id: user.id, username: user.username},
            JWT_SECRET, 
            {expiresIn: '1h'}
        );

        return res.status(200).json({user: {id: user.id, username: user.username, name: user.name, role: user.role}, token});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({error: 'Server error'});
    }
}