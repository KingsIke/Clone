import express, { Router, NextFunction, Request, Response, response } from 'express';
import { getLogIn, logIn } from '../controller/loggingController';
const router = Router()

router.get('/login', getLogIn)
router.post('/login', logIn)
export default router