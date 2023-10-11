import express, { Express, NextFunction, Request, Response } from 'express';
import User, { userInstance } from '../schema/userSchema';
import { options, userValidation } from '../Middleware/validation'
import bcrypt from 'bcrypt'
import session from "express-session"


export const logIn = async (req: Request, res: Response, next: NextFunction) => {
    const { logUsername, logPassword } = req.body
    interface CustomSessionData extends session.SessionData {
        existingUser?: userInstance;
    }
    try {


        if (req.body) {
            const user = await User.findOne({
                $or: [
                    {
                        username: logUsername
                    },
                    {
                        password: logPassword
                        // username: payload.username

                    }
                ]
            })


            if (user) {
                const comparePassword = await bcrypt.compare(logPassword, user.password);

                if (comparePassword) {
                    (req.session as CustomSessionData).existingUser = user;
                    return res.redirect('/')
                }
                else {
                    req.body.errorMessage = 'Incorrect Credentials';
                    console.log('user does not exist')
                    // return res.status(400).render('register', payload);

                    return res.status(400).redirect('/login')
                }
            }

        }

    } catch (error) {
        console.log(error);
        req.body.errorMessage = 'An error occurred during registration';
        return res.status(500).render('register');
    }
}

export const getLogIn = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).render('login')
}