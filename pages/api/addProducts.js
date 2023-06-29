import connectToMongo from "@/middleware/mongooose";
connectToMongo()
import Product from "@/models/Product";
const handler = async (req, res) => {
    if (req.method == 'POST') {
        const objectBody = JSON.parse(req.body);
        try {
            let p = new Product({
                title: objectBody.title,
                slug: objectBody.slug,
                desc: objectBody.description,
                img: "objectBody.img",
                category: objectBody.type,
                size: objectBody.size,
                color: objectBody.color,
                price: objectBody.price,
                avaiableQty: objectBody.quantity
            })
            await p.save()
            res.status(200).json({ success: true, message: 'Successfully Added the Product' })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ success: false, error: 'Internal Server Error' })
        }
    } else {
        res.status(400).json({ success: false, error: 'This request is not allowed' })
    }
}

export default handler