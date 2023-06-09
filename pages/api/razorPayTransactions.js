import razorpayfinal from "@/middleware/razorPay"

export default async function handler(req, res) {
    const { subTotal, cart } = req.body;
    try {

        if (req.method == 'POST') {
            const options = {
                amount: toString(Number.parseFloat(subTotal) * 100),
                currency: 'INR',
                receipt: 'orderreceipt11'
            }

            const finalresult = await razorpayfinal.orders.create(options)
            res.status(200).json({ finalresult })
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}