import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import env from 'dotenv'
import {ExtractJwt, Strategy as JwtStratergy} from 'passport-jwt'
import passport from 'passport';
import NoteRoter from '../backend/Routes/NoteRoute.js'
import User from './models/UserSchema.js';
import UserRouter from './Routes/UserRoute.js'
const app = express();
env.config();

//Midleware
app.use(express.json());
app.use(
    cors({
        origin:'http://localhost:5173',
        credentials:true,
    })
);
app.use(passport.initialize());


//Database Connection
const MONGODB = process.env.MONGODB_URL;
mongoose
    .connect(MONGODB)
    .then(()=> console.log("Connected to mongoDB"))
    .catch((err)=> console.error("MongoDB Connection Error.", err.message));


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_AUTH || 'defaultSecret',
};
passport.use(
    new JwtStratergy(opts, async (payload, done)=>{
        try{
            const user = await User.findById(payload.id);
            if(user){
                return done(null, user);
            }else{
                return done(null, false, {message: "User Not Found"});
            }
        }catch(error){
            return done(error);
        };
    })
);


// Routes
app.use('/api/note',NoteRoter);
app.use('/api/auth',UserRouter)


//Server
const port = process.env.PORT;
app.listen(3000, ()=>{
    console.log(`Server started on Port: ${port}`);
});