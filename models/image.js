const mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    img:
    {
        data: Buffer,
        contentType: String
    }, 
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true});
 
//Image is a model which has a schema imageSchema
 
module.exports = new mongoose.model('Image', imageSchema);