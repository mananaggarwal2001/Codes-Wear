import connectToMongo from "@/middleware/mongooose";
connectToMongo()
import User from "@/models/User";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {

            console.log(req.body)
            const user = await User.findOne({ Email: req.body.Email });
            if (user) {
                if (user.Email === req.body.Email && user.Password === req.body.Password) {
                    res.status(200).json({ success: true, user: user })
                } else {
                    res.status(400).json({ success: false, error: "Invalid Credentials" })
                }
            } else {
                res.status(400).json({ success: false, error: "User not found" })
            }

        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    } else {
        res.status(400).json({ success: false, error: 'This type of req method is not allowed' });
    }
}

export default handler;