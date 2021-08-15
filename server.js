'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const mongoose = require('mongoose');
const { request, response } = require('express');
const app = express();
const PORT = process.env.PORT;
const JWKSURI = process.env.JWKSURI;
const MONGO_DB_URL =process.env.MONGO_DB_URL;
const {seedUserData} = require('./models/user.model');
const {haveBooks} = require('./controller/book.controller');
const {makeBook} = require('./controller/book.controller');
const {removeBook} =require('./controller/book.controller');
const {updateBook} =require('./controller/book.controller')
app.use(cors());
app.use(express.json());
app.get('/test', (request, response) => {
  return('hello from backend')

  // TODO: 
  // STEP 1: get the jwt from the headers
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
  // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end

})
mongoose.connect(`${MONGO_DB_URL}books`,{ userNewUrlParser: true, useUnifiedTopology: true} );

const client = jwksClient({
  jwksUri: JWKSURI
});

function haveKey(header,callback) {
  client.getSigningKey(header.kid, function(err,key){
    var signinKey = key.publicKey || key.rsaPublicKey;
    callback(null,signinKey);
  });
}
app.get('/test', (request,response)=>{
  const tokenKey = request.headers.authorization.split(' ')[1];
  jwt.verify(tokenKey,haveKey, {} ,(error,user) => {
    if(error){
      response.send('invalid token');
    }
    response.json(user);
  });
});
seedUserData();
app.get('/books',haveBooks);
app.post('./book',makeBook);
app.delete('/book/:book_id' ,removeBook);
app.put('/book/:book_id' , updateBook);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
