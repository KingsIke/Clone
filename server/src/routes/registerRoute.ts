import express, { Router, NextFunction, Request, Response, response } from 'express';
import { registerGet, registerCreate } from '../controller/registerController'
const router = Router()

router.get('/', registerGet)

router.post('/', registerCreate)

export default router