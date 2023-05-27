const mongoose = require('mongoose')
// order schema is ready to be use in the codeswear website.

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    }

}, { timestamps: true })


mongoose.models = {}
export default mongoose.model('User', userSchema)