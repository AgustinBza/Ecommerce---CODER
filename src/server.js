import express from 'express';
import morgan from 'morgan';
import productsRouter from './routs/product.routes.js';
import cartsRouter from './routs/cart.routes.js';
import userRouter from './routs/user.router.js';
import handelbars from 'express-handlebars';
import sessionRouter from './routs/session.routes.js';
import { __dirname } from './utils.js';
import viewsRouter from './routs/views.router.js';
import { config } from "./config.js";
import ticketRouter from "./routs/ticket.router.js";
import emailRouter from "./routs/email.routes.js"
import { logger } from './logger.js';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { info } from './docs/info.js';



const app = express();

const specs = swaggerJSDoc(info); // Especificaciones


app.use('/docs',swaggerUi.serve, swaggerUi.setup(specs)); // Ruta desde donde debe levantarse la documentacion en la vista de swagger
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

app.engine('handlebars', handelbars.engine());
app.set('views',__dirname + '/views');
app.set('view engine','handlebars');

app.use(cookieParser(config.SECRET_COOKIES));
app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);
app.use('/api/users', userRouter);
app.use('/api/session', sessionRouter);
app.use('/', viewsRouter);
app.use('/ticket', ticketRouter);
app.use('/email',emailRouter);


const PORT = config.PORT || 8080;

app.listen(PORT, () => logger.info('server ok') );

logger.info('Logs modo: ' + config.ENVIRONMENT);

export default app;