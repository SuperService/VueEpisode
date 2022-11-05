import { config } from "process";
import Stripe from "stripe";
export default defineEventHandler(async (event) => {
    const body = await useBody(event);    
    const stripeSecret = useRuntimeConfig().stripeSecret;
    const stripe = new Stripe(stripeSecret);

    const res = await stripe.products.list({
        ids: body.products.map((product) => product.id)
    });

    const lineItems = res.data.map((product) => ({
        price: product.default_price,
        quantity: body.products.find((item) => item.id === product.id).quantity,
    }))

    const session = await stripe.checkout.sessions.create({
        cancel_url: "http://localhost:3000/cart",
        success_url: "http://localhost:3000/checkout/success",
        mode: "payment",
        line_items: lineItems
    })

    return session;
})