const mongoose = require('mongoose')
// order schema is ready to be use in the codeswear website.

const ForgotSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    token: {
        type: String,
        required: true
    }


}, { timestamps: true })


mongoose.models = {}
export default mongoose.model('Forgot User', ForgotSchema)