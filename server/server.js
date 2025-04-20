import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { db } from "./dbconnector/Connect"

dotenv.config()

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.get("/", (req, res) => {
    res.send("Server is running");
})

//Start server
app.listen(PORT, () => {
    db();
    console.log(`Server is running on port ${PORT}`);
})