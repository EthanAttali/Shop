import { Card } from '@mui/material'
import style from './style.module.scss'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { toast } from 'react-toastify';

const Contact = () => {
    
    const handleCopy = async (text: string) => {
        await navigator.clipboard.writeText(text)
        toast.success('successfully copied')
    }

    return(
        <div className={style.contactContainer}>
            <span className={style.title}>Contact</span>
            <Card className={style.contact}>
                <span> ATTALI Ethan</span>
                <div className={style.email}>
                    Email: ethanattali@gmail 
                    <ContentCopyIcon onClick={() => handleCopy('ethanattali@gmail.com')}/>
                </div>
                <span className={style.email}>Tel: 058-4023390 <ContentCopyIcon onClick={() => handleCopy('058-4023390')}/></span>
            </Card>
        </div>
    )
}

export default Contact