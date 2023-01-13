import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../../lib/stripe';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { priceID } = request.body;

  if(request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  if(!priceID) {
    return response.status(400).json({ error: 'Price not found.' });
  }

  const successURL = `${process.env.NEXT_URL}/sucess?session_id={CHECKOUT_SESSION_ID}`; 
  const cancelURL = `${process.env.NEXT_URL}/`; 

  const checkoutSesson: any = await stripe.checkout.sessions.create({
    success_url: successURL,
    cancel_url: cancelURL,
    mode: 'payment',
    line_items: [
      {
        price: priceID,
        quantity: 1
      }
    ],
  } as any);

  return response.status(201).json({
    checkoutURL: checkoutSesson.url
  });
}