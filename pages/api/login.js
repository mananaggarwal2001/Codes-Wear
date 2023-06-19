import connectToMongo from "@/middleware/mongooose";
connectToMongo()
import User from "@/models/User";
import CryptoJS from "crypto-js";
const jwt = require('jsonwebtoken')
const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const user = await User.findOne({ Email: req.body.Email });
            const bytes = CryptoJS.AES.decrypt(user.Password, process.env.AES_SECRET);
            const finalPassword = bytes.toString(CryptoJS.enc.Utf8)
            if (user) {
                if (user.Email === req.body.Email && finalPassword == req.body.Password) {
                    let token = jwt.sign({ success: true, Name: user.Name, Email: user.Email }, process.env.JWT_SECRET)
                    res.status(200).json({ email: user.Email, token, success: true })
                } else {
                    res.status(400).json({ success: false, error: "Invalid Credentials" })
                }
            } else {
                res.status(400).json({ success: false, error: "User not found" })
            }

        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    } else {
        res.status(400).json({ success: false, error: 'This type of req method is not allowed' });
    }
}

export default handler;