
import connectToMongo from "@/middleware/mongooose"
connectToMongo()
import User from "@/models/User"
import pincodes from '../../data/pincodes.json'
import Jwt from "jsonwebtoken";
export default async function handler(req, res) {
    if (req.method == 'POST') {
        const { address, pincode, city, state, name, phoneNumber } = req.body;
        try {
            const { token } = req.body;
            let finaluser;
            const data = Jwt.verify(token, process.env.JWT_SECRET) // for verifying the given user data.
            if (Object.keys(pincodes).includes(pincode)) {
                finaluser = await User.findOneAndUpdate({ Email: data.Email }, { Address: address, Pincode: pincode, City: pincodes[pincode][0], State: pincodes[pincode][1], Name: name, PhoneNumber: phoneNumber }, { returnDocument: 'after' });
            } else {
                finaluser = await User.findOneAndUpdate({ Email: data.Email }, { Address: address, Pincode: pincode, Name: name, PhoneNumber: phoneNumber }, { returnDocument: 'after' });
            }

            res.status(200).json({ success: true, user: finaluser, message: 'Successfully Updated User!!!!' })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ success: false, error: 'Some Error Occured' })
        }
    } else {
        res.status(400).json({ success: false, error: 'Method Not Allowed!!' })
    }
}