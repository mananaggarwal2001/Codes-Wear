
import connectToMongo from "@/middleware/mongooose"
connectToMongo()
import User from "@/models/User"
import Jwt  from "jsonwebtoken";
export default async function handler(req, res) {
    if (req.method == 'POST') {
        const { token } = req.body;
        
        const data = Jwt.verify(token, process.env.JWT_SECRET)
        const finaluser = await User.findOne({ Email: data.Email });
        res.status(200).json({ success: true, user: finaluser });
    } else {
        res.status(400).json({ success: true, error: 'Not Found' })
    }
}