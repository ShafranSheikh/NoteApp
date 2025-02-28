import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import env from 'dotenv'
import NoteRoter from '../backend/Routes/NoteRoute.js'
const app = express();
env.config();

app.use(express.json());
app.use(
    cors({
        origin:'http://localhost:5173',
    })
);


//Database Connection
const MONGODB = process.env.MONGODB_URL;
mongoose
    .connect(MONGODB)
    .then(()=> console.log("Connected to mongoDB"))
    .catch((err)=> console.error("MongoDB Connection Error.", err.message));



app.use('/api/note',NoteRoter);




const port = process.env.PORT;
app.listen(3000, ()=>{
    console.log(`Server started on Port: ${port}`);
});