const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Simple checkout session
router.post('/create-checkout-session', async (req, res) => {
    try {
        const { amount, productName } = req.body;
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: productName || 'Product',
                    },
                    unit_amount: amount * 100, // Convert to cents
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${req.protocol}://${req.get('host')}/success`,
            cancel_url: `${req.protocol}://${req.get('host')}/cancel`,
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error('Payment Error:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
