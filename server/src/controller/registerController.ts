import express, { Express, NextFunction, Request, Response } from 'express';
import User from '../schema/userSchema'



export const registerCreate = async (req: Request, res: Response, next: NextFunction) => {

    // console.log(req.body)÷
    const { firstName, lastName, password, username, email, confirmPassword } = req.body
    const payload = req.body
    if (payload.password !== payload.confirmPassword) {
        console.log("Check your password")
    }

    try {

        if (payload) {
            await User.findOne({
                $or: [

                    { username: payload.username },
                    { email: payload.email }
                ]
            }).then((user) => {
                console.log(user)
            })

        } else {
            payload.errorMessage = 'Make sure all ur input has a valid value'
            return res.status(200).render('register', payload)
        }
    } catch (error) {
        console.log(error)
    }

}
export const registerGet = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).render('register')
}
