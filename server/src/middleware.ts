// import { Request, Response, NextFunction } from "express"

// // import { Request, Response, NextFunction } from "express";
// import { Session } from "express-session";

// interface IRequestWithSession extends Request {
//   session: Session;
// }
// const requireLogin = (req: Request, res: Response, next: NextFunction) => {
//     if (req.session && req.session.user) {
//         return next()
//     }
//     else {
//         return res.redirect('/login')
//     }
// }

// module.exports = requireLogin

import { Request, Response, NextFunction } from "express";
import { Session } from "express-session";

interface MySession extends Session {
    user?: string;
}

const requireLogin = (
    req: Request & { session: MySession },
    res: Response,
    next: NextFunction
) => {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.redirect("/login");
    }
};

export default requireLogin;
