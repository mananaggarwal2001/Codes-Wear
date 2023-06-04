const https = require('https');
/*
* import checksum generation utility
* You can get this utility from https://developer.paytm.com/docs/checksum/
*/
const PaytmChecksum = require('paytmchecksum')


export default async function handler(req, res) {
    if (req.method == 'POST') {


        try {
            const { oid, subtotal, email } = req.body // using the destructing operator for doing the operation
            let paytmParams = {};

            paytmParams.body = {
                "requestType": "Payment",
                "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
                "websiteName": "YOUR_WEBSITE_NAME",
                "orderId": oid,
                "callbackUrl": `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
                "txnAmount": {
                    "value": subtotal,
                    "currency": "INR",
                },
                "userInfo": {
                    "custId": email,
                },
            };

            /*
            * Generate checksum by parameters we have in body
            * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
            */
            const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.NEXT_PUBLIC_PAYTM_MID)
            paytmParams.head = {
                "signature": checksum
            };

            let post_data = JSON.stringify(paytmParams);

            const promiseresponse = async () => {
                return new Promise((resolve, reject) => {
                    let options = {

                        /* for Staging */
                        // hostname: 'securegw-stage.paytm.in',

                        /* for Production */
                        hostname: 'securegw.paytm.in',

                        port: 443,
                        path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${oid}`,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Content-Length': post_data.length
                        }
                    };

                    let response = "";

                    let post_req = https.request(options, function (post_res) { // this function is making the secure https request and we have to make this function in that manner that it will return the promise so that to follow the bloacking nature of the given code.
                        post_res.on('data', function (chunk) {
                            response += chunk;
                        });

                        post_res.on('end', function () {
                            console.log('Response: ', response);
                            resolve(response)
                        });
                    });

                    post_req.write(post_data);
                    post_req.end();
                })
            }

            const mytoken = await promiseresponse(); // for getting the paytm token.
            res.status(200).json({ mytoken })
        } catch (error) {
            console.log(error.message)
        }


    }
}