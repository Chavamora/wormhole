const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deporteSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    ejercicio: {
        type: String,
        required: true
    }, 
    series: {
        type: String,
        required: true
    },
    desempeño: {
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

const Deporte = mongoose.model('Deporte', deporteSchema);
module.exports = Deporte;