import { StreamPay } from "@streampay/checkout-sdk";
import { NextApiRequest, NextApiResponse } from "next";

const sdk = new StreamPay({
  api_key: process.env.STREAMPAY_PRIVATE_API_KEY!,
  network: "mainnet",
  config: {
    collect_shipping_address: false,
  },
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const response = await sdk.session.create({
        success_url: "http://commerce.streampayment.app/success",
        cancel_url: "http://commerce.streampayment.app/cancel",
        tokens: ["dust", "samo", "str", "shdw"], // SOL, STR and USDC are default tokens and rest whitelisted tokens are optional to add and remove
        items: [
          {
            name: "Elon's Tweet folder",
            price: 0.01, // value must be in $USD
            image:
              "https://res.cloudinary.com/ddum5vpp3/image/upload/v1665883691/unknown_14_azezsk.png",
            quantity: 1,
            size: "small", // optional param 
          },
        ],
        shipping_fees: 0.5, // value must be in $USD | optional param 
      });

      res.status(200).json(response);
    } catch (error) {
      console.log(error);

      res.status(200).json({
        error: "Error creating session",
      });
    }
  } else {
    res.status(405).json({
      error: "Method not allowed",
    });
  }
};

export default handler;
