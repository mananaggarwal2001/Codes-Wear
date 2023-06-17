import connectToMongo from "@/middleware/mongooose";
connectToMongo()
import razorpayfinal from "@/middleware/razorPay"
import Order from "@/models/Order";

export default async function handler(req, res) {
    const { cart, subTotal, email, name, phone, pincode, address } = req.body;
    try {

        if (req.method == 'POST') {

            // intiate an order accroding to the generated the order id

            const finalresult = await razorpayfinal.orders.create({
                amount: Number.parseInt(subTotal) * 100,
                currency: 'INR'
            })
            console.log(finalresult)
            // for creating the particualar order and store the details of the order id.
            const neworder = new Order({
                email: email,
                orderID: finalresult.id,
                name: name,
                paymentInfo: 'This is the new info for doing the payment',
                address: address,
                amount: Number.parseInt(subTotal),
                products: cart
            })

            // check if the cart is tampered whether the given cart is tampered or not.

            // check if the cart items are out of stock or not.

            // check if the details are valid or not for getting the order to the right customer.
            await neworder.save()
            res.status(200).json({ finalresult })
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}