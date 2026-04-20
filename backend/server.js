import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
// import db from './config/db.js'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/' , (req , res)=>{
    res.send(`API is running ..`)
});

app.get('/test', (req, res) => {
    res.send("Test route working");
  });
connectDB();

app.listen(5001 , ()=>{
    console.log(`Server is running on port 5001`);
} ) ;