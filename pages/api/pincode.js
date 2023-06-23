// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import pincodes from '../../data/pincodes.json'
export default function handler(req, res) {

    let areapincodes = pincodes;
    res.status(200).json(pincodes)
}