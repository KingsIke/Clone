import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import requireLogin from './middleware'
import LoginRouter from "./routes/loginRoutes"

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.set('view engine', 'pug')
app.set("views", path.join(__dirname, "..", "views"))
app.use(express.json())
app.use(express.static(path.join(__dirname, "..", "public")))

// Routes

// chapter6

app.use('/login', LoginRouter)



app.get('/', requireLogin, (req: Request, res: Response, next: NextFunction) => {

    const payload = {
        pageTitle: "Home"
    }
    res.render('home', payload)
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port} ..`);
});