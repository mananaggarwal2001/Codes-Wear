const mongoose = require('mongoose')
// order schema is ready to be use in the codeswear website.

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, required: true
    }

}, { timestamps: true })

export default mongoose.model('Product', userSchema);