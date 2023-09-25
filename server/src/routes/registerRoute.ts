import express, { Router, NextFunction, Request, Response, response } from 'express';
const router = Router()

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).render('register')
})

router.post('/', (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.body)÷
    const { firstName, lastName, password, username, email, confirm } = req.body
    const payload = req.body

    if (payload) {
        return
    } else {
        payload.errorMessage = 'Make sure all ur input has a valid value'
        return res.status(200).render('register', payload)
    }
})

export default router