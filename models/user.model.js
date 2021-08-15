
const mongoose = require('mongoose');
const bookSchema = require('./book.model');


const userSchema = new mongoose.Schema({
    myEmail: {type: String },
    books: [bookSchema]
 });
 const userModel = mongoose.model('users' , userSchema);
 const seedUserData = () => {
     const newUser = new userModel({
         myEmail: 'yazeedalshami@gmail.com',
         books: [
             {
                 title: 'Broken Glass',
                 description: ' a black comedy told by a disgraced teacher without much in the way of full stops or paragraph breaks',
                 status: 'available',

             },
             {
             title: 'A Little Life',
                 description: 'This operatically harrowing American gay melodrama became an unlikely bestseller, and one of the most divisive novels of the century so far',
                 status: 'available',
             },
             {
                title: 'Chronicles: Volume One',              
                description: ' Dylan’s reticence about his personal life is a central part of the singer-songwriter’s brand, so the gaps and omissions in this memoir come as no surprise',
                status: 'available',
             },
         ]
     })
     newUser.save();
 }
module.exports ={userModel,seedUserData};
