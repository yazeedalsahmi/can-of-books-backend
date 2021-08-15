'use strict';

const { request, response } = require('express');
const { userModel } = require('../models/user.model');
const haveBooks = (request, response) => {
    const { email } = request.query;
    console.log(request.query.email, 'hi')
    console.log(userModel);
    userModel.find({ myEmail: email }, (error, user) => {
        if (error) {
            response.send(error)
        } else {
            response.json(user)
        }

    });
}

const makeBook = (req,res) => {
    const myEmail = req.body.myEmail;
    const title = req.body.title;
    console.log(title);
    const description = req.body.description;
    console.log(description);
    const status = req.body.status;
    console.log(status);
    console.log(req.body);
    const newBook= new userModel({
        myEmail: myEmail,
        books:{
            title,
            description,
            status,

        }
    });
    console.log(newBook);
    newBook.save();
    res.json(newBook);
}

const removeBook = (req,res) => {
    try{
        const id =req.params.book_id;
        const {myEmail} = req.query;
        console.log(id);
        userModel.findOne({myEmail: email} , (error,data) => {
            data[0].books.splice(id,1);
            data.save();
            res.send(data);
        });
        }
   catch(error){
       res.send(error.info);
   }
};
module.exports = {haveBooks,
    makeBook,
    removeBook}