// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Forgot from "@/models/Forgot"
import User from "@/models/User";

export default function handler(req, res) {
    // check if the user exists in the database.
    // send an email to the user for bringing the link for changing the password.
    if (req.method === 'POST') {
        if (req.body.sendMail) {
            const { email } = req.body;
            let token = '123456789012'
            let forgot = new Forgot({
                email: email,
                token: token,
            })


            let messageemail = `<span style="font-size: 12px; line-height: 1.5; color: #333333;">

We have sent you this email in response to your request to reset your password on codeswear.com. After you reset your password, any credit card information stored in My Account will be deleted as a security measure.

To reset your password please follow the link below:

<a href="https://codeswear.com/forgotpassword?token=${token}">Click here to reset your password.</a>

<br/><br/>

We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your My Account Page and change your password.

<br/><br/>

</span>`
            res.status(200).json({ success: true, message: 'email sent successfully' })
        } else if (!req.body.sendMail) {
            // reset user password.
        }
    }
}