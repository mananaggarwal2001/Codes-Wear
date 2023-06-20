import connectToMongo from "@/middleware/mongooose";
connectToMongo()
import razorpayfinal from "@/middleware/razorPay"
import Order from "@/models/Order";
import Product from "@/models/Product";

export default async function handler(req, res) {
    const { cart, subTotal, email, name, phone, pincode, address } = req.body;
    try {

        if (req.method == 'POST') {
            let sumTotal = 0, product = 0;
            for (let item in cart) {
                product = await Product.findOne({ slug: item })
                console.log(product)
                sumTotal = sumTotal + (product.price * cart[item].qty);
                // check if the item are out of stock or not.

                if (product.avaiableQty < cart[item].qty) {
                    res.status(500).json({ success: false, error: 'Some items Went Out of Stock. New Stock will coming soon!!!!!!!!!!' });
                    return;
                }
                if (product.price != cart[item].Price) {
                    res.status(500).json({ success: false, error: 'Price of some items has being changed' });
                    return;
                }
            }

            if (sumTotal != subTotal) {
                res.status(500).json({ success: false, error: 'Total Price is being tampered' });
                return;
            }
            // check if the details are valid or not for getting the order to the right customer.

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

            await neworder.save()
            res.status(200).json({ success: true, finalresult })
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, error: 'Internal Server Error' })
    }
}