
import connectToMongo from "@/middleware/mongooose"
connectToMongo()
import User from "@/models/User"
import pincodes from '../../data/pincodes.json'
import Jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
export default async function handler(req, res) {
    if (req.method == 'POST') {
        try {
            const { token, password, confirmpassword, newpassword } = req.body;
            const data = Jwt.verify(token, process.env.JWT_SECRET) // for verifying the given user data.
            const finaluser = await User.findOne({ Email: data.Email })
            const bytes = CryptoJS.AES.decrypt(finaluser.Password, process.env.AES_SECRET);
            const finalPassword = bytes.toString(CryptoJS.enc.Utf8)
            console.log(finalPassword, password, confirmpassword, newpassword)
            if (finalPassword === password && confirmpassword === newpassword)
            {
                const updatedData = await User.findOneAndUpdate({ Email: data.Email }, { Password: CryptoJS.AES.encrypt(newpassword, process.env.AES_SECRET).toString() }, { returnDocument: 'after' })
                const finalbytes = CryptoJS.AES.decrypt(updatedData.Password, process.env.AES_SECRET);
                const finallyPassword = finalbytes.toString(CryptoJS.enc.Utf8)
                console.log(finallyPassword)
                res.status(200).json({ success: true, message: 'Password Updated Successfully' })
                return;
            }
            res.status(400).json({ success: false, error: 'password and confirm Password doesn\'t match' })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ success: false, error: 'Some Error Occured' })
        }
    } else {
        res.status(400).json({ success: false, error: 'Method Not Allowed!!' })
    }
}