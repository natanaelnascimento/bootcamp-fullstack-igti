import mongoose from 'mongoose';

const accountSchema = mongoose.Schema({
    agencia: {
        type: Number,
        required: true
    },
    conta: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) throw new Error('Valor do balance não pode ser menor que 0.');
        }
    }
});

const model = mongoose.model('account', accountSchema, 'accounts');

export default model;