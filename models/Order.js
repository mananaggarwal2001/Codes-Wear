const mongoose = require('mongoose')
// order schema is ready to be use in the codeswear website.

const orderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    products: [{
        productId: {
            type: String,
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
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
        required: true,
        default: 'Pending'
    }

}, { timestamps: true })

mongoose.models= {}
export default mongoose.model('Orders', orderSchema);