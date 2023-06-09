import Razorpay from "razorpay";
const razorpayfinal = new Razorpay({ key_id: process.env.NEXT_PUBLIC_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })
export default razorpayfinal