const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hobbieSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }, 
    notas: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Hobbie = mongoose.model('Hobbie', hobbieSchema);
module.exports = Hobbie;