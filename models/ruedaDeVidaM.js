const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ruedaDeVidaMSchema = new Schema({
    crecimiento_personalM: {
        type: Number,
        required: true
    },
    negocios_estudiosM: {
        type: Number,
        required: true
    }, 
    familiaM: {
        type: Number,
        required: true
    },
    saludM: {
        type: Number,
        required: true
    },
    amigosM: {
        type: Number,
        required: true
    },
    recreacion_diversionM: {
        type: Number,
        required: true
    },
    amorM: {
        type: Number,
        required: true
    },
    contribucionM: {
        type: Number,
        required: true
    },
    finanzasM: {
        type: Number,
        required: true
    },
    espiritualM: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true});

const RuedaDeVidaM = mongoose.model('RuedaDeVidaM', ruedaDeVidaMSchema);
module.exports = RuedaDeVidaM;