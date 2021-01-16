const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const metaSchema = new Schema({
    responsable: {
        type: String,
        required: true
    },
    prioridad: {
        type: String,
        required: true
    }, 
    estado: {
        type: String,
        required: true
    },
    fecha_inicio: {
        type: String,
        required: true
    },
    fecha_final: {
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

const Meta = mongoose.model('Meta', metaSchema);
module.exports = Meta;