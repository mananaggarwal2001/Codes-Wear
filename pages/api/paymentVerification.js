import connectToMongo from "@/middleware/mongooose";
connectToMongo()
import razorpayfinal from "@/middleware/razorPay"
import Order from "@/models/Order";

export default function handler(req, res) {
    //validate the razorpay checksum whether the given data is valid or not.

    // Update status into orders table after checking the transaction status.
    // Intiate shipping of the particular order.
    // Redirect the user to the order confirmation page.
    const finalfunction= req.body
    res.status(200).json({finalfunction})
}
