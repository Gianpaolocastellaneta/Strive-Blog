import 'dotenv/config';
import express, { application } from 'express';
import mongoose from 'mongoose';
import authorRoutes from './routes/authorRoutes.js'
import postRoutes from './routes/postRoutes.js'
import cors from 'cors'
import morgan from 'morgan';
import helmet from 'helmet'
import endpoints from "express-list-endpoints"
import authenticationRouter from './routes/authenticationRoutes.js';
import passport from 'passport';
import GoogleStrategy from './config/passport.config.js';
import authorization from './middleware/authorization.js';

const port = process.env.PORT;


//creo il server
const server = express()

passport.use('google', GoogleStrategy)//non è un middleware ma serve per dire a passport di usare la strategia


//collegamento al db
await mongoose.connect(process.env.MONGODB_CONNECTION_URI).then(()=>{
    console.log('connessione al db ok')
}).catch((err)=> {console.log(err)})

server.use(express.json())// tutti i body che invieremo saranno in json
server.use(cors()) 
server.use(morgan("dev"))
server.use(helmet ())
server.use("/authors",authorization, authorRoutes)
server.use("/blogPosts",authorization, postRoutes)
server.use("/auth",authenticationRouter)


// server.listen(port, ()=>{
//     console.log('Server is running on port ' + port)
//     console.table(endpoints(server))
// })

server.listen(port, () => {
    console.log("🌚 Server has started on port " + port + "!" + " \n🌝 The server has these endpoints: \n");
    console.table(endpoints(server));
  });