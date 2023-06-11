import connectToMongo from "@/middleware/mongooose";
connectToMongo()
import User from "@/models/User";
import CryptoJS from "crypto-js";
const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            const { Name, Email } = req.body;
            console.log(Name)
            console.log(Email)

            let finaluser = new User({ Name, Email, Password: CryptoJS.AES.encrypt(req.body.Password, process.env.AES_SECRET).toString() })
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