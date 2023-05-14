import connectToMongo from "@/middleware/mongooose";
connectToMongo()
import Product from "@/models/Product";
const handler = async (req, res) => {
    console.log(req)
    if (req.method == 'POST') {
        try {
            for (let i = 0; i < req.body.length; i++)
            {
                let finalResult = await Product.findByIdAndUpdate(req.body[i]._id, req.body[i]);
                console.log(finalResult)
            }
            res.status(200).json({ success: 'succes added the result' })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: 'Internal Server Error' })
        }

    } else {
        res.status(400).json({ error: 'This request is not allowed' })
    }
}

export default handler