import {Request, Response} from 'express';
import * as smsService from '../services/sms.service';

interface CodeRecord{
    code: number;
    expiresAt: number;
}

const storeCode: {[phoneNumber: string]: CodeRecord} = {};
const phoneNumber = process.env.TWILIO_PHONE_NUMBER ?? '+972584023390';

export const sendCode = async(req: Request, res: Response) => {
    const code = Math.floor(100000 + Math.random() * 900000)
    try{
        await smsService.sendSMS(phoneNumber, code)
        console.log(`Code envoye: ${code}`);
        const expiresAt = Date.now() + 5 * 60 * 1000; // expire dans 5 min
        storeCode[phoneNumber] = ({code, expiresAt})
        res.status(200).json({message: 'Code envoye'});
    }
    catch(error: any){
        res.status(500).json({error: error.message});
    }
}

export const checkCode = async(req: Request, res: Response) => {
    try{
        const {codeClient} = req.body;
        const codeSent = storeCode[phoneNumber];
        if(codeClient === codeSent.code && Date.now() <= codeSent.expiresAt){
            res.status(200).json({message: 'Code Correct'})
        }
        else{
            throw new Error('Bad or expired code')
        }
    }
    catch(error: any){
        res.status(500).json({error: error.message})
    }
}