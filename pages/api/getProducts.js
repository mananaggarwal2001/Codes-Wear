import Product from "@/models/Product"
import connectToMongo from "@/middleware/mongooose"
connectToMongo()

// For finding the respective Products which is present in the database.

const handler = async (req, res) => {
    // for finding the number of  the products in the api.
    let finalProducts = await Product.find() // for fetching the final products from the mongodb database.
    let tshirts = {}; // for getting the number of tshirts in the array for getting the final output.
    try {
        for (let item of finalProducts)
        {
            if (item.title in tshirts) {
                if (!tshirts[item.title].color.includes(item.color) && item.avaiableQty > 0) {
                    tshirts[item.title].color.push(item.color)
                }

                if (!tshirts[item.title].size.includes(item.size) && item.avaiableQty > 0) {
                    tshirts[item.title].size.push(item.size)
                }

            } else {
                tshirts[item.title] = JSON.parse(JSON.stringify(item)) // for making the deep copy of the given object in the javascript for getting the desrired output.
                if (item.avaiableQty > 0)
                {
                    tshirts[item.title].color = [item.color] // for making the array of the tshirts color which is available in the variants in the website.
                    tshirts[item.title].size = [item.size] // for making the size variants in the website for getting the different sizes in the regular tshirts.
                }

            }
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({error:'Internal Server error'})
    }

    res.status(200).json({ tshirts })
}
export default handler;