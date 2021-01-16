const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materiaSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    horas_semana: {
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

const Materia = mongoose.model('Materia', materiaSchema);
module.exports = Materia;