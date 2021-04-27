const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preguntaSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    respuesta: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Pregunta = mongoose.model('Pregunta', preguntaSchema);
module.exports = Pregunta;