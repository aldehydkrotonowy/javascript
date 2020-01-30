'use strict'

import { Router } from 'express';
import errorHandler from '../services/errorHandler';
import registerController from '../controllers/registerController';



const registerRoute = new Router();


registerRoute.post('/', registerController.createNewUser)
registerRoute.use('/', errorHandler);


export default registerRoute