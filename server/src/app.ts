import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import requireLogin from './middleware'
import LoginRouter from "./routes/loginRoutes"
import RegisterRouter from "./routes/registerRoute"
import bodyParser from 'body-parser'
import { Database } from './database/mongo';

new Database()


dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.set('view engine', 'pug')
app.set("views", path.join(__dirname, "..", "views"))
app.use(express.json())
app.use(express.static(path.join(__dirname, "..", "public")))
app.use(bodyParser.urlencoded({ extended: false }))

// Routes

// chapter6

app.use('/login', LoginRouter)
app.use('/register', RegisterRouter)




app.get('/', requireLogin, (req: Request, res: Response, next: NextFunction) => {

    const payload = {
        pageTitle: "Home"
    }
    res.render('home', payload)
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port} ..`);
});
