import { transporter } from '../services/email.service.js';
import { config } from '../config.js';

export const sendGmail = async(req, res)=>{
    try {
        console.log(config.GMAIL);
        console.log(config.GMAIL_PASS);
        const { dest, name } = req.body;
        const gmailOptions = {
            from: config.GMAIL,
            to: dest,
            subject: 'Bienvenido/a',
            html: `<h1>Hola ${name}, ¡Te damos la bienvenida a Coderhouse!</h1>`
        };
        const response = await transporter.sendMail(gmailOptions);
        console.log('email enviado!');
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}