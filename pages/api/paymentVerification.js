import connectToMongo from "@/middleware/mongooose";
connectToMongo()
import razorpayfinal from "@/middleware/razorPay"
import Order from "@/models/Order";
import Product from "@/models/Product";
import CryptoJS, {HmacSHA256} from "crypto-js";

const handler= async (req, res)=> {
    //validate the razorpay checksum whether the given data is valid or not.

    // Update status into orders table after checking the transaction status.
    let finalorder = await Order.findOne({ orderID: req.body.razorpay_order_id })
    let updatedFinalOrder= await Order.findByIdAndUpdate(finalorder._id, { status: 'Pending', paymentInfo:req.body}, {returnDocument:'after'}) // this will update the status to Pending in the existing id after updating the document.
    let generatedSignature = HmacSHA256(req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id, process.env.RAZORPAY_KEY_SECRET).toString()

    if (generatedSignature == updatedFinalOrder.paymentInfo.razorpay_signature) {
        const afterorder= await Order.findByIdAndUpdate(finalorder._id, { status: 'Paid' })
        res.redirect(`/websitepages/order?Orderid=${finalorder._id}&clearCart=1`, 200); // for redirecting to the order confirmaiton page for getting the particular order.
        let products = afterorder.products;
        console.log(products);
        for (let itemsslug in products) {
            let finalproduct = await Product.findOneAndUpdate({ slug: itemsslug }, { $inc: { avaiableQty: - products[itemsslug]["qty"] } }, { returnDocument: 'after' });
        }
    } else {
        await Order.findByIdAndUpdate(finalorder._id, { status: 'Abort' })
        res.status(500).json({ error: 'Internal Server Error' });
    }
    // Intiate shipping of the particular order.
    // Redirect the user to the order confirmation page.

}

export default handler;