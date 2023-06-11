export default function handler(req, res) {
    // Update status into orders table after checking the transaction status.
    // Intiate shipping of the particular order.
    // Redirect the user to the order confirmation page.


    const finalfunction= req.body
    res.status(200).json({finalfunction})
}
