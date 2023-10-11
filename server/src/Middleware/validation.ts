import Joi from 'joi';
import express, { Express, NextFunction, Request, Response } from 'express';
import { Session } from 'express-session';
import { userInstance } from '../schema/userSchema';

interface mySession extends Session {
    user?: userInstance
}


export const requireLogin = (
    req: Request & { session: mySession },
    res: Response,
    next: NextFunction
) => {
    if (req.session && req.session.user) {
        return next()
    }
    else {
        return res.redirect('/')
    }
}

export const userValidation = Joi.object({

    username: Joi.string().alphanum().min(3).max(30).required(),

    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{1,30}$')),

    confirmPassword: Joi.ref('password'),

    email: Joi.string().email(),

    firstName: Joi.string().required(),

    lastName: Joi.string().required()

})
export const options = {
    abortEarly: false,
    errors: {
        wrap: { label: "" }
    }
}