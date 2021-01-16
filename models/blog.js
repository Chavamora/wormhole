const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }, 
    cuerpo: {
        type: String,
        required: true
    } , 
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;