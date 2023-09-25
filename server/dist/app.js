"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const middleware_1 = __importDefault(require("./middleware"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const registerRoute_1 = __importDefault(require("./routes/registerRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.set('view engine', 'pug');
app.set("views", path_1.default.join(__dirname, "..", "views"));
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
// Routes
// chapter6
app.use('/login', loginRoutes_1.default);
app.use('/register', registerRoute_1.default);
app.get('/', middleware_1.default, (req, res, next) => {
    const payload = {
        pageTitle: "Home"
    };
    res.render('home', payload);
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port} ..`);
});
