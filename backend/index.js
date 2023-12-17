/* === IMPORT === */
import express from "express";
import dotenve from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";

dotenve.config();
const app = express();

/* 
* checking connection
* if connection success, show msg in console
* if error show msg error
*/
try {
    await db.authenticate(); // auth db
    console.log('Database connect successfully'); // success msg
} catch (error) {
    console.error(error); // error
}

app.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}));
app.use(cookieParser());
app.use(express.json());
app.use(router);

// Listening port
const port = 5000
app.listen(port, () => {
    console.log(`Authenticate System | listening at http://localhost:${port}`)
})