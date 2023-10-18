import express, { Router, NextFunction, Request, Response, response } from 'express';
import { logOut } from '../controller/loggingController';
const router = Router()

router.get('/logout', logOut)
export default router