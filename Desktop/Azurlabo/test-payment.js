require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Serve the checkout page
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Stripe Payment Test</title>
            <script src="https://js.stripe.com/v3/"></script>
            <style>
                body { font-family: Arial; padding: 20px; }
                button { padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; }
            </style>
        </head>
        <body>
            <h2>Test Payment</h2>
            <button onclick="checkout()">Pay $10</button>

            <script>
                const stripe = Stripe('${process.env.STRIPE_PUBLISHABLE_KEY}');

                async function checkout() {
                    try {
                        const response = await fetch('/create-checkout-session', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                amount: 1000, // $10.00
                                productName: 'Test Product'
                            })
                        });
                        
                        const session = await response.json();
                        const result = await stripe.redirectToCheckout({
                            sessionId: session.id
                        });

                        if (result.error) {
                            alert(result.error.message);
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        alert('Something went wrong!');
                    }
                }
            </script>
        </body>
        </html>
    `);
});

// Create checkout session
app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: req.body.productName || 'Test Product',
                    },
                    unit_amount: req.body.amount, // amount in cents
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${req.protocol}://${req.get('host')}/success`,
            cancel_url: `${req.protocol}://${req.get('host')}/cancel`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Success and cancel routes
app.get('/success', (req, res) => {
    res.send(`
        <html>
            <head>
                <style>
                    body { font-family: Arial; padding: 20px; text-align: center; }
                    .success { color: #4CAF50; }
                    button { padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; }
                </style>
            </head>
            <body>
                <h2 class="success">Payment Successful!</h2>
                <p>Thank you for your purchase.</p>
                <button onclick="window.location.href='/'">Back to Home</button>
            </body>
        </html>
    `);
});

app.get('/cancel', (req, res) => {
    res.send(`
        <html>
            <head>
                <style>
                    body { font-family: Arial; padding: 20px; text-align: center; }
                    .cancel { color: #f44336; }
                    button { padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; }
                </style>
            </head>
            <body>
                <h2 class="cancel">Payment Cancelled</h2>
                <p>Your payment was cancelled.</p>
                <button onclick="window.location.href='/'">Try Again</button>
            </body>
        </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Test server running on port ${PORT}`);
});
