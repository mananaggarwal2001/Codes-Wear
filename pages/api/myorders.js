import connectToMongo from "@/middleware/mongooose"
connectToMongo()
import Order from "@/models/Order"
import  Jwt  from "jsonwebtoken"

export default async function handler(req, res) {
    if (req.method == 'POST') {
        const token = req.body.token;
        const data = Jwt.verify(token, process.env.JWT_SECRET)
        const orders = await Order.find({ email: data.Email });
        console.log(orders)
        res.status(200).json({ orders });
    } else {
        res.status(500).json({error:'Internal Server error'})
    }
}