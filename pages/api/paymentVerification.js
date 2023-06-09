export default function handler(req, res) {
    const finalfunction= req.body
    res.status(200).json({finalfunction})
}
