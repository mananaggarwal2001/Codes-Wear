const mongoose = require('mongoose')
// order schema is ready to be use in the codeswear website.

const orderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    orderID: {
        type: String,
        required: true,
        unique:true
    },
    name: {
        type: String,
        required:true
    },
    paymentInfo: {
        type: Object,
        default: ''
    },
    products: {
        type: Object,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'Intiate'
    },
    deliveryStatus: {
        type: String,
        default: 'unshipped'
    }

}, { timestamps: true })

mongoose.models = {}
export default mongoose.model('Orders', orderSchema);