const mongoose = require('mongoose');
const UserSchema  = new mongoose.Schema({
  name :{
      type  : String,
      required : true
  } ,
  email :{
    type  : String,
    required : true
} ,
password :{
    type  : String,
    required : true
} ,
date :{
    type : Date,
    default : Date.now
},
tipo: {
    type: Number,
    default: 1
}
});
const User= mongoose.model('User',UserSchema);

module.exports = User;


// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     }, 
//     password: {
//         type: String,
//         required: true
//     },
//     profilePicture: {
//         data: Buffer,
//         contentType: String
//     },
//     coverPhoto: {
//         data: Buffer,
//         contentType: String
//     }
// }, {timestamps: true});

// const User = mongoose.model('User', userSchema);
// module.exports = User;



// const mongoose = require('mongoose');
// const UserSchema  = new mongoose.Schema({
//   name :{
//       type  : String,
//       required : true
//   } ,
//   email :{
//     type  : String,
//     required : true
// } ,
// password :{
//     type  : String,
//     required : true
// } ,
// date :{
//     type : Date,
//     default : Date.now
// }
// });
// const User= mongoose.model('User',UserSchema);

// module.exports = User;