const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ruedaDeVidaSchema = new Schema({
    crecimiento_personal: {
        type: Number,
        required: true
    },
    negocios_estudios: {
        type: Number,
        required: true
    }, 
    familia: {
        type: Number,
        required: true
    },
    salud: {
        type: Number,
        required: true
    },
    amigos: {
        type: Number,
        required: true
    },
    recreacion_diversion: {
        type: Number,
        required: true
    },
    amor: {
        type: Number,
        required: true
    },
    contribucion: {
        type: Number,
        required: true
    },
    finanzas: {
        type: Number,
        required: true
    },
    espiritual: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true});

const RuedaDeVida = mongoose.model('RuedaDeVida', ruedaDeVidaSchema);
module.exports = RuedaDeVida;