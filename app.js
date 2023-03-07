import express from 'express';

import handlebars from 'express-handlebars';
import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';

import mongoose from 'mongoose';
import initializePassport from './src/config/passport.config.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import { __dirname } from './utils.js';
import cartsRoutes from  './src/routes/carts.routes.js';   
import productsRoutes from './src/routes/products.routes.js';
import sessionRoutes from './src/routes/session.routes.js';
import viewsRouter from './src/routes/views.routes.js';

//aplicaciónn
const app = express();

//monboDb
mongoose.set('strictQuery',true);
mongoose.connect('mongodb://localhost:27017/ecommerce').
    catch(err => console.log('Error al conectar a MongoDB', err));

//hbs configuración    
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine', 'hbs');
app.set('views', `${__dirname} + /views`);

//---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

//rutas
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartsRoutes);
app.use('/session', sessionRoutes);
app.use('/', viewsRouter);
app.get('*', (req, res) => { res.status(404).send('404 not found')})


app.listen(3000, () => console.log('Server up in port 3000'))