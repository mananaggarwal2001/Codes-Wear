import connectToMongo from "@/middleware/mongooose"
connectToMongo()
import Order from "@/models/Order"
import  Jwt  from "jsonwebtoken"

export default async function handler(req, res) {
    if (req.method == 'POST') {
        // console.log(req.body)
        // console.log(typeof req.body)
        const token = req.body.value;
        const data = Jwt.verify(token, process.env.JWT_SECRET)
        const orders = await Order.find({ email: data.Email, status:'Paid' });
        console.log(orders)
        res.status(200).json({ orders });
    } else {
        res.status(500).json({error:'Internal Server error'})
    }
}