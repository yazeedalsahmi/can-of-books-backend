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

const makeBook = (req, res) => {
    const myEmail = req.body.myEmail;
    const title = req.body.title;
    console.log(title);
    const description = req.body.description;
    console.log(description);
    const status = req.body.status;
    console.log(status);
    console.log(req.body);
    const newBook = new userModel({
        myEmail: myEmail,

        title,
        description,
        status,
        myEmail: myEmail,


    });
    console.log(newBook);
    newBook.save();
    res.json(newBook);
}

const removeBook = (req, res) => {

    const id = req.params.book_id;

    userModel.deleteOne({ _id: id }, (error, book) => {

        res.json(book.deletedCounts);
    });
}
const updateBook = async (req, res) => {
    const bookId = req.params.book_id;
    const { title, description, status } = req.body;
    userModel.findByIdAndUpdate({ _id: bookId },
        {
            title: title,
            description: description,
            status: status,
        },
        { new: true },
        (err, data) => {
            res.send(data);
        })
};
  


module.exports = {
    haveBooks,
    makeBook,
    removeBook,
    updateBook
}