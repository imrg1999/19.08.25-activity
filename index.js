import express from 'express';
import { connectDB } from './Config/DBconnection.js';

const app = express();
const port = 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Database Connection
connectDB();

app.get('/', (req,res) => {
    res.status(200).json({
        success: true,
        message: "Homepage"
    });
});

app.listen(port, () => {
    console.log(`The Server is listening on port no. ${port}`);
});