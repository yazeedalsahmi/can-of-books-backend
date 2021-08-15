
const mongoose = require('mongoose');
const bookSchema = require('./book.model');


const userSchema = new mongoose.Schema({
    myEmail: {type: String },
    books: [bookSchema]
 });
 const userModel = mongoose.model('users' , userSchema);
 const seedUserData = () => {
     const book1 = new userModel({
                 title: 'Broken Glass',
                 description: ' a black comedy told by a disgraced teacher without much in the way of full stops or paragraph breaks',
                 status: 'available',
                 myEmail : 'alshamiyazeed@gmail.com'

             });
             const book2 = new userModel({
             title: 'A Little Life',
                 description: 'This operatically harrowing American gay melodrama became an unlikely bestseller, and one of the most divisive novels of the century so far',
                 status: 'available',
                 myEmail : 'alshamiyazeed@gmail.com'

             });
             const book3 = new userModel({

                title: 'Chronicles: Volume One',              
                description: ' Dylan’s reticence about his personal life is a central part of the singer-songwriter’s brand, so the gaps and omissions in this memoir come as no surprise',
                status: 'available',
                myEmail : 'alshamiyazeed@gmail.com'
        
     });
     book1.save();
     book2.save();
     book3.save();
 }
module.exports ={userModel,seedUserData};
