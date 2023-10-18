import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { requireLogin } from './Middleware/validation';
import LoginRouter from "./routes/loginRoutes";
import RegisterRouter from "./routes/registerRoute";
import bodyParser from 'body-parser';
import { Database } from './database/mongo';
import session, { Session } from 'express-session';
import { userInstance } from './schema/userSchema';
import logOutRouter from './routes/logOutRoutes';

new Database();

// Define a custom session data type
declare module 'express-session' {
    interface SessionData {
        existingUser?: userInstance;
    }
}

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "..", "views"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
    // cookie: { secure: true }
}));

// Routes
app.use('/', LoginRouter);
app.use('/', RegisterRouter);
app.use('/', logOutRouter);


app.get('/', (req: Request, res: Response, next: NextFunction) => {
    const payload = {
        pageTitle: "Home",
        userLogged: req.session.existingUser, // Use the correct property name 'existingUser'
    };
    res.render('home', payload);
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port} ..`);
});
