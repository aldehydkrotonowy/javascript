'use strict'

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import UserSchema from '../schema/userSchema';

const checkBodyFields = (req, res, next) => {
    if (!req.body.email) {
        next({ type: 'emptyEmail', message: 'Empty body in reqest. No email' });
    }
    else if (!req.body.password) {
        next({ type: 'emptyPassword', message: 'Empty body in reqest. No password' });
    }
    else {
        next();
    }
}

const loginUser = (req, res, next) => {
    console.log('LC: class loginUser: start')
    const user = {};
    user.email = req.body.email;
    user.password = req.body.password;
    UserSchema.findOne({ 'user.email': user.email }, (err, userdb) => {
        console.log('LC: class loginUser: trying to find user in db')
        if (err) {
            console.log('LC: class loginUser: error during find')
            return next(err)
        }
        if (!userdb) {
            console.log('LC: class loginUser: no user in db');
            res.header('Access-Control-Allow-Origin', '*');
            res.status(200).send({ message: 'server: no user in database' });
        }
        if (userdb) {
            console.log('LC: class loginUser: user found in db')
            if (bcrypt.compareSync(user.password, userdb.user.password)) {
                console.log('LC: class loginUser: bcrypt pass compared: ok')
                const payload = { id: userdb.user.userID };
                console.log('LC: class loginUser: payload is', payload)
                const token = jwt.sign(payload, process.env.SECRET_OR_KEY);
                console.log('LC: class loginUser: token created', token)
                res.header('Access-Control-Allow-Origin', '*');
                res.status(200).send({ status: 'token generated', token: token });
            } else {
                console.log('LC: class loginUser: bcrypt pass compared: not match')
                return next({ message: 'server: password is wrong' });
            }
        }
    })
}

export default {
    checkBodyFields: checkBodyFields,
    loginUser: loginUser
}