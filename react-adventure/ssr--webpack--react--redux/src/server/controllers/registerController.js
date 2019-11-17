'use strict'

import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import UserSchema from '../schema/userSchema';



const createNewUser = (req, res, next) => {
  console.log('RC: class creteNewUser: start');
    UserSchema.findOne({ 'user.email': req.body.email }, (err, dbentry) => {
      if (err) {
        console.log('RC: class creteNewUser: error');
        return next(err)
      }
      if (dbentry) {
        console.log('RC: class creteNewUser: user registered');
        return next({message: 'User with email: '+dbentry.user.email+' is already registered'});
      } else {
  
        // create user
        const newUser = new UserSchema();
        newUser.user.userID = mongoose.Types.ObjectId();
        newUser.user.firstName = req.body.firstname;
        newUser.user.lastName = req.body.lastname;
        newUser.user.email = req.body.email;
        newUser.user.login = req.body.email;
        newUser.user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        newUser.cards = [];
        console.log('RC: class creteNewUser: creating user');
  
        newUser.save((err) => {
  
          if (err) {
            return next(err);
          } else {
            console.log('RC: class creteNewUser: user created in db');
            console.log('NewUser: ', newUser);
            res.header('Access-Control-Allow-Origin', '*');
            res.status(200).send('New user registration succcesfull : ' + JSON.stringify(newUser));
          }  
        })
  
      }
    })
  
  }

export default {
  createNewUser: createNewUser
}