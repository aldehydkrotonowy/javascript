// import path from 'path';
import env from 'dotenv';
env.config();
import 'colors';
//------------------------------------------------------------------------------------------ express
import express from 'express';
import expressSessioon from 'express-session';
import bodyParser from 'body-parser';
//------------------------------------------------------------------------------------------ React
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter, Route } from 'react-router-dom';
//------------------------------------------------------------------------------------------ Redux
import { createStore } from 'redux';
//------------------------------------------------------------------------------------------ mongoose
import mongoose from 'mongoose';
//------------------------------------------------------------------------------------------ mine
import App from '../app/App';
import loginRoute from './routes/login';
import registerRoute from './routes/register';
import reducer from '../app/store/reducers/reducer';
import TestSchama from './schema/example';
import UserSchema from './schema/userSchema';
//------------------------------------------------------------------------------------------ passport
import passport from 'passport';
import passportJWT from 'passport-jwt';

const dbURI = 'mongodb+srv://GN:' + process.env.MONGO_ATLAS_PW + '@ngcluster0-juzpz.mongodb.net/test?retryWrites=true';
const JwtStrategy = passportJWT.Strategy;
const extractJWT = passportJWT.ExtractJwt;
const opts = {
  jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY
}
const strategy = new JwtStrategy(opts, (payload, done) => { //payload = token from jwtFromRequest?
  console.log('payload is :', payload);
  UserSchema.findOne({ 'email': payload.email }, (err, user) => {
    if (err) {
      return done(err, false)
    }
    if (user) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  })
  done(null, user);
})






passport.use(strategy);

mongoose.connect(dbURI)
  .then(() => {
    console.log('Database connection established!');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const port = 3000;

// enable cors in development mode
if (app.get('env') === 'DEVELOPMENT') {
  console.log('CORS ENABLED');
  app.use(function (req, res, next) {
    if ('OPTIONS' == req.method) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Authorization, Content-Length, X-Requested-With');
      res.sendStatus(200); //send(200) - deprecated
    }
    else {
      next();
    }
  });
}






app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));// for parsing application/x-www-form-urlencoded
// app.use(expressValidator()); in future
// app.use(cookieParser()); unknown




// app.use(expressSessioon({
//   secret: process.env.SESSION_SECRET_KEY,
//   saveUninitialized: false, //Forces a session that is "uninitialized" to be saved to the store. Creates cookie event if user is not logged in
//   resave: false
//   //cookie: {secure: true}
// }));

passport.serializeUser((user, done) => {
  done(null, user.id);
})
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  })
})

app.use(passport.initialize());
app.use(passport.session());

// app.post('/testlogin', (req, res) => {
//   console.log(req.body);
//   console.log(req.body.user);
//   if (req.body.user){
//     req.session.user = req.body.user;
//     console.log('user added to the session')
//     res.status(200).send('it works');
//   } else {
//     console.log('somethin wrong, no user in req.body');
//     res.status(400).send('not working');
//   }
// })

// app.post('/trylogin', function (req, res) {
//   console.log('a',req.session);
//   if(!req.session.user){
//     console.log('no user in session');
//     res.status(401).send('no user in session')
//   } else {
//     if (req.session.user === req.body.user){
//       console.log('b',req.session);
//       res.status(200).send('hi there');
//     } else {
//       console.log('c',req.body);
//       console.log('d',req.session);
//       res.status(401).send('you have no access'+JSON.stringify(req.session));
//     }
//   }
// });

app.use('/', express.static('build/public'));
app.use('/fonts', express.static('build/public/fonts'));
app.use('/images', express.static('build/public/images'));
app.use('/register', registerRoute);
app.use('/login', loginRoute);


// app.get('/protectedExample', passport.authenticate('jwt', {session: false}), (req, res, next) => {//https://www.youtube.com/watch?v=TcwngmeqLRk

// })

// app.use('/', handleRender);

app.get('/*', function (req, res) {
  res.send(path.join(__dirname, 'build', 'public', 'index.html'));
});


// app.get('/*', (req, res, next) => {
//   const activeRoute = routes.find( (route) => match(req.url, route) || {})
// })



function handleRender(req, res) {
  TestSchama.find()
    .select('name price _id')
    .exec()
    .then(
      (docs) => {
        if (docs) {


          const resp = {
            count: docs.length,
            products: docs.map(doc => {
              return {
                name: doc.name,
                price: doc.price,
                _id: doc._id,
                request: {
                  type: 'GET',
                  url: 'http://localhost/dbtest/' + doc._id
                }
              }
            })
          }


          return resp
        } else {
          resp = {};
        }
      })
    .then((dbData) => {

      const store = createStore(reducer, dbData);

      const html = renderToString(
        <StaticRouter location={req.url} context={{}}>
          <Provider store={store}>
            <Route path='/' component={props => <App {...props} />} />
          </Provider>
        </StaticRouter>
      )

      const preloadedState = store.getState();

      res.header('Access-Control-Allow-Origin', '*');
      res.send(renderFullPage(html, preloadedState))
    })
    .catch(err => console.log(err));
}

function renderFullPage(html, preloadedState) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
 
        <link rel="stylesheet" type="text/css" href="styles.css">
        <link rel="shortcut icon" href="favicon.ico">

        <title>React App</title>
      </head>
      <body>
        <noscript>
          You need to enable JavaScript to run this app.
        </noscript>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        <script type="text/javascript" src="app.js"></script>
      </body>
    </html>
    `
}


app.listen(port, () => console.log(`${'>>>'.cyan} ${'Server started.'.bold.underline.blue} ${'Listening on:'.yellow} ${'localhost::'.magenta}${`${port}`.green}`));