// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {

    let pincodes = {
        "110092": ["Delhi", "Delhi"],
        "721302": ["Kharakpur", "Web Bengal"],
        "560017":["Banglore", "Karnataka"]
    }
    res.status(200).json(pincodes)
}
