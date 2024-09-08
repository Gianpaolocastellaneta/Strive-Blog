import express from 'express';
import {register,login,me,callBackGoogle } from '../controllers/authentication.controller.js';
import authorization from '../middleware/authorization.js';
import passport from 'passport';
import uploadCloudinary from '../middleware/uploadCloudinary.js'

const authenticationRouter = express.Router()

authenticationRouter.post('/register',uploadCloudinary.single('avatar'), register);
authenticationRouter.post('/login', login);
authenticationRouter.get('/me',authorization, me);

// lo scopo di questa rotta è di ridirezionarci alla pagina di Google
// passando l'app id e il segreto in maniera che ci identifichi
// il middleware fa già tutto, non è necessario un controller
authenticationRouter.get(
    '/login-google',
        passport.authenticate('google', 
        { scope: ['profile', 'email'] }) // middleware di passport che ci ridireziona alla pagina di Google
);

// questa rotta recupera l'utente dal db oppure lo crea se non è già presente
// poi genera il jwt con l'id dell'utente nel payload
// quindi ridireziona al frontend passando il jwt come query string nell'url
authenticationRouter.get(
    '/callback-google',
    passport.authenticate('google', { session: false }), // riceve i dati del profilo e crea il jwt aggiungendolo in req.user
    callBackGoogle // ridireziona al frontend passando il jwt come query string nell'url
);

export default authenticationRouter;