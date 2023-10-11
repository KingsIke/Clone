import express, { Router, NextFunction, Request, Response, response } from 'express';
import { registerGet, registerCreate } from '../controller/registerController'
const router = Router()

router.get('/register', registerGet)

router.post('/register', registerCreate)

export default router