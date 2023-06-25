// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Forgot from "@/models/Forgot"
import connectToMongo from "@/middleware/mongooose";
connectToMongo()
import User from "@/models/User";
import CryptoJS from "crypto-js";
import nodemailer from 'nodemailer'
import Jwt from "jsonwebtoken";
export default async function handler(req, res) {
    // check if the user exists in the database.
    // send an email to the user for bringing the link for changing the password.
    if (req.method === 'POST') {
        let existedEmail;
        if (req.body.sendMail) {
            const { email } = req.body;
            let token = '123456789012'
            let forgot = new Forgot({
                email: email,
                token: token,
            })
            existedEmail = await User.findOne({ Email: email });
            if (!existedEmail) {
                res.status(400).json({ success: false, error: 'User Doesn\'t exist!!!' })
                return;
            } // for the user existance whether the user existed or not.
            let secret = process.env.JWT_SECRET;
            let finaltoken = Jwt.sign({ email: existedEmail.Email, id: existedEmail._id }, secret, { expiresIn: '10m' }); // this is the token which is send through email for doing the verification process.
            let createdLink = `${process.env.NEXT_PUBLIC_HOST}/websitepages/forgotpassword?token=${finaltoken}`
            let messageemail = `<span style="font-size: 12px; line-height: 1.5; color: #333333;">


We have sent you this email in response to your request to reset your password on codeswear.com. After you reset your password, any credit card information stored in My Account will be deleted as a security measure.

To reset your password please follow the link below:

<strong><a href=${createdLink}>Click here to reset your password.</a></strong>

</br></br>

We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your My Account Page and change your password.

<br/><br/>

</span>`

            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                // host: 'smtp.gmail.com',
                // port: 465,
                // secure:true,
                auth: {
                    user: process.env.GOOGLE_EMAIL,
                    pass: process.env.GOOGLE_PASSWORD
                }
            });
            let mailoptions = {
                from: process.env.GOOGLE_EMAIL,
                to: email,
                subject: 'Password Reset Link',
                html: messageemail,
            }

            transporter.sendMail(mailoptions, (error, response) => {
                if (error) {
                    res.status(400).json({ success: false, message: 'Internal Server Error', secret: secret })
                    return;
                } else if(response) {
                    console.log(response)
                    res.status(200).json({ success: true, message: 'Email sent successfully on your Account', secret: secret })
                }
            })

        } else if (!req.body.sendMail) {
            const { nPassword, token } = req.body;
            console.log(nPassword);
            const data = Jwt.verify(token, process.env.JWT_SECRET);
            console.log(data);
            let aesPassword = CryptoJS.AES.encrypt(nPassword, process.env.AES_SECRET).toString()
            const finaloutput = await User.findOneAndUpdate({ Email: data.email }, { Password: aesPassword }, { returnDocument: 'after' })
            if (!finaloutput) {
                return res.status(400).json({ success: false, error: 'Password Can\'t be updated' })
            } else {
                return res.status(200).json({ success: true, message: 'Password Updated Successfully' })
            }
        }
    }
}