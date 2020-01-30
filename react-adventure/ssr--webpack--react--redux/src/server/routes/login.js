'use strict'

import { Router } from 'express';
import loginController from '../controllers/loginController';
import errorHandler from '../services/errorHandler';



const router = new Router();


router.use('/', loginController.checkBodyFields);
router.post('/', loginController.loginUser);
router.use('/', errorHandler);


export default router