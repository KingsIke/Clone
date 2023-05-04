import express, { Router, NextFunction, Request, Response, response } from 'express';
const router = Router()

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).render('login')
})

export default router