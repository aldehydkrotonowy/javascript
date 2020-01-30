// import path from 'path';
const express = require('express');
const mongoose = require('mongoose');
require('colors');
const bodyParser = require('body-parser');
const TestSchama = require('./schema');

const app = express();
const port = 3000;

//Mongoose Atlas 'test' database
mongoose.connect('mongodb+srv://NGuser:'+process.env.MONGO_ATLAS_PW+'@ngclaster-xfew3.mongodb.net/test?retryWrites=true');
app.use(bodyParser.urlencoded({ extended: true })) //works fine,


app.post('/product', function(req, res, next){	
	res.setHeader('Content-Type', 'text/plain');
	const pr = new TestSchama({
		_id: new mongoose.Types.ObjectId(),
		name: "ala ma kota",
		price: 12.99
	})
	//product.save();	
	res.write('product is:');
	res.end(JSON.stringify(pr));
})
app.post('/test', function(req, res, next){
	const pr = new TestSchama({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price
	})
	console.log(req.body);
	res.send(pr);
})


app.post('/dbtest', (req, res, next) => {
  console.log('uuuuuuuuuuuu',req.headers['content-type'])
  console.log('body', req.body);
  const product = new TestSchama({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  })
  product.save().then( (result) => {console.log(result)});

  res.send(product);
})


app.get('/dbtest/all', (req, res, next) => {
  TestSchama.find()
  .select('name price _id')
  .exec()
  .then( 
    (docs) => {
      if (docs) {
        const resp = {
          count: docs.length,
          products: docs.map( doc => {
            return {
              name: doc.name,
              price: doc.price,
              _id: doc._id,
              request: {
                type: 'GET',
                url: 'http://localhost/dbtest/'+doc._id
              }
            }
          })
        }
        res.status(200).send(resp);
      } else {
        res.status(404).json({message: "No entries in DB"})
      }
  })
  .catch( (err) => {
    console.log(err);
    res.status(500).json({error: err})
  });
})


app.get('/dbtest/:productId', (req, res, next) => {
  const id = req.params.productId;
  TestSchama.findById(id)
  .exec()
  .then( 
    (doc) => {console.log(doc);
      if (doc) {
        // res.status(200).json(doc);
        res.status(200).send(doc);
      } else {
        res.status(404).json({message: "entry wit this ID not found"})
      }
  })
  .catch( (err) => {
    console.log(err);
    res.status(500).json({error: err})
  });
})
// -------------------------------------------------------------------------




app.post('/',function(req,res,next){
	console.log('llll');
	res.send('lllll');
})

app.post('/path1', function(req, res, next){
	res.setHeader('Content-Type', 'text/plain')
	res.write('you posted to path1:\n')
	res.end(JSON.stringify(req.body, null, 2))
	console.log(req.body);
});
app.post('/path2', function(req, res, next){
	res.setHeader('Content-Type', 'text/plain')
	res.write('you posted to path2:\n')
	res.end(JSON.stringify(req.body, null, 2))
	console.log(req.body);
});
app.post('/*',function(req,res,next){
	console.log('uuuuuu');
	res.send('uuuuuu');
})

app.listen(port, () => console.log(`${'>>>'.cyan} ${'Server started.'.bold .underline .blue} ${'Listening on:'.yellow} ${'localhost::'.magenta}${`${port}`.green}`));