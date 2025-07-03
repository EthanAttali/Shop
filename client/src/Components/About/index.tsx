import style from './style.module.scss'

const About = () => {

    return (
        <div className={style.aboutContainer}>
            <span className={style.title}>About our web site</span>
            <p className={style.container}> 
                This web site is a training website, the goal of this site was to learn how to build a fullstack application
                <br/>My name is Ethan Attali and i am a software developper
                <br/>I studied in Ruppin between 2018 and 2022
            </p>
        </div>
    )
}
export default About;