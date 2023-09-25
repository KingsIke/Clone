"use strict";
// import { Request, Response, NextFunction } from "express"
Object.defineProperty(exports, "__esModule", { value: true });
const requireLogin = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    else {
        return res.redirect("/login");
    }
};
exports.default = requireLogin;
