import connectToMongo from "@/middleware/mongooose";
connectToMongo()
import Product from "@/models/Product";
const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            for (let i = 0; i < req.body.length; i++)
            {
                let p = new Product({
                    title: req.body[i].title,
                    slug: req.body[i].slug,
                    desc: req.body[i].desc,
                    img: req.body[i].img,
                    category: req.body[i].category,
                    size: req.body[i].size,
                    color: req.body[i].color,
                    price: req.body[i].price,
                    avaiableQty: req.body[i].avaiableQty
                })
            }

            res.status(200).json({ success:'succes added the result'})
        } catch (error) {
            console.log(error.message)
            res.status(500).json({error:'Internal Server Error'})
        }

    } else {
        res.status(400).json({ error: 'This request is not allowed' })
    }
}

export default handler