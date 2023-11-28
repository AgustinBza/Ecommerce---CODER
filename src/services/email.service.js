import { createTransport } from "nodemailer";
import { config } from "../config.js";
import { logger } from "../logger.js";

export const transporter = createTransport({
    service: 'gmail',
    // host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.GMAIL,
        pass: config.GMAIL_PASS
    }
});

const createMsgRegister = (first_name) => {
    return `<h1>Hola ${first_name}, ¡Bienvenido/a, ya estas registrado!</h1>`
};

const createMsgReset = (first_name) => {
    return `<h1>Hola ${first_name}, ¡Hacé click 
    <a href='http://localhost:8080/new-pass'>AQUI</a> 
    para restablecer tu contraseña!</h1>`
};

const deleteUserMsg = (first_name) => {
    return `<h1>Hola ${first_name},¡Tu cuenta fue eliminada por inactividad!</h1>`
};

const deleteUserPremiumMsg = (first_name,title) => {
    return `<h1>Hola ${first_name},¡Su producto "${title}" fue eliminado!</h1>`
};

export const sendMail = async(user, service, token = null) => {
    try {
       const { first_name, email } = user;
       let msg = '';
       service === 'register'
       ? msg = createMsgRegister(first_name)
       : service === 'resetPass'
       ? msg = createMsgReset(first_name)
       : service === 'delete'
       ? msg = deleteUserMsg(first_name)
       : service === 'deletePremium'
       ? msg = deleteUserPremiumMsg(first_name)
       : msg = ''


       let subj = '';
       subj = 
       service === 'register'
       ? 'Bienvenido/a'
       : service === 'resetPass'
       ? 'Restablecimiento de contraseña'
       : service === 'delete'
       ? 'Usuario Inactivo'
       : service === 'deletePremium'
       ? 'Borrado de producto User Premium'
       : '';
       

       const gmailOptions = {
        from: config.GMAIL,
        to: email,
        subject: subj,
        html: msg
       };

       const response = await transporter.sendMail(gmailOptions);
       if(token !== null) return token;
       logger.info('email enviado');
       return true;
    } catch (error) {
        logger.error(error);
    }
}

    export const sendMailDeletPremium = async(user,product, service, token = null) => {
        try {
           const { first_name, email } = user;
           const { title } = product;
           let msg = '';
           service === 'deletePremium'
           ? msg = deleteUserPremiumMsg(first_name,title)
           : msg = ''
    
    
           let subj = '';
           subj = 
           service === 'deletePremium'
           ? 'Borrado de producto User Premium'
           : '';
           
    
           const gmailOptions = {
            from: config.GMAIL,
            to: email,
            subject: subj,
            html: msg
           };
    
           const response = await transporter.sendMail(gmailOptions);
           if(token !== null) return token;
           logger.info('email enviado');
           return true;
        } catch (error) {
            logger.error(error);
        }

};