import express, { Express, NextFunction, Request, Response } from 'express';
import User, { userInstance } from '../schema/userSchema';
import { options, userValidation } from '../Middleware/validation'
import bcrypt from 'bcrypt'
import session from "express-session"
export const registerCreate = async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, password, username, email, confirmPassword } = req.body;
    const payload = req.body;
    const salt = 10
    // interface mySession extends Session {
    //     existingUser?: userInstance
    // }
    interface CustomSessionData extends session.SessionData {
        existingUser?: userInstance;
    }

    try {
        const userError = userValidation.validate(payload, options);
        if (userError.error) {
            // payload.errorMessage = userError.error
            payload.errorMessage = userError.error
            console.log('Error in validation', payload.errorMessage)
            // return res.status(400).render('register', payload)
            return res.status(400).render('register', payload.errorMessage)

        }


        // bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        // });

        if (payload) {
            const existingUser = await User.findOne({
                $or: [
                    {
                        username: payload.username
                    },
                    {
                        email: payload.email,
                        // username: payload.username

                    }
                ]
            });


            if (!existingUser) {

                const hashPassword = await bcrypt.hash(payload.password, salt);
                const newUser = new User({
                    firstName,
                    lastName,
                    username,
                    email,
                    password: hashPassword,
                    confirmPassword: hashPassword
                });
                await newUser.save();
                console.log('user created', newUser);
                (req.session as CustomSessionData).existingUser = newUser;

                // (req.session as Session).existingUser = newUser;
                return res.redirect('/login');


            } else if (existingUser.email === payload.email) {

                payload.errorMessage = 'Email already in use';
                console.log('user exist')
                return res.status(400).render('register', payload);
            }
            else {
                payload.errorMessage = 'UserName already in use';
                console.log('user exist')
                return res.status(400).render('register', payload);
            }

        }
    } catch (error) {
        console.log(error);
        payload.errorMessage = 'An error occurred during registration';
        return res.status(500).render('register', payload);
    }
}

export const registerGet = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).render('register');
}
