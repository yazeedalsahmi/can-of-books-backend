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
module.exports = haveBooks;