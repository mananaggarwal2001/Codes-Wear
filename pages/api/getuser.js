
import connectToMongo from "@/middleware/mongooose"
connectToMongo()
import User from "@/models/User"
import Jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
export default async function handler(req, res) {
    if (req.method == 'POST') {
        try {
            const { token } = req.body;
            const data = Jwt.verify(token, process.env.JWT_SECRET) // for verifying the given user data.
            const finaluser = await User.findOne({ Email: data.Email });
            const bytes = CryptoJS.AES.decrypt(finaluser.Password, process.env.AES_SECRET);
            const finalPassword = bytes.toString(CryptoJS.enc.Utf8)
            res.status(200).json({ success: true, finalPassword, user: finaluser })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ success: false, error: 'Internal Server Error' })
        }
    } else {
        res.status(400).json({ success: false, error: 'Method Not Allowed!!' })
    }
}