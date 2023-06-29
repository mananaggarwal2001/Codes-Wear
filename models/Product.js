import mongoose from "mongoose";
// order schema is ready to be use in the codeswear website.

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true,
        default: ''
    },
    category: {
        type: String,
        required: true
    },
    size: {
        type: String,
    },
    color: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    avaiableQty: {
        type: Number,
        required: true,
        default: 1
    }

}, { timestamps: true })

mongoose.models = {}
export default mongoose.model('Product', productSchema);