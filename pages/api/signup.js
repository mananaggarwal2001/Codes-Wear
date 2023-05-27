import connectToMongo from "@/middleware/mongooose";
connectToMongo()
import User from "@/models/User";
const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            console.log(req.body)
            let finaluser = new User(req.body)
            await finaluser.save()
            res.status(200).json({ finalresult: finaluser })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: 'Internal Server Error' })
        }

    } else {
        res.status(400).json({ error: 'This request is not allowed' })
    }
}

export default handler