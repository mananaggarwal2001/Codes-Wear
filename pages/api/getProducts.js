import Product from "@/models/Product"
import connectToMongo from "@/middleware/mongooose"
connectToMongo()

// For finding the respective Products which is present in the database.

const handler = async (req, res) => {
    let finalProducts = await Product.find() // for fetching the final products from the mongodb database.
    res.status(200).json({ finalProducts })
}
export default handler;