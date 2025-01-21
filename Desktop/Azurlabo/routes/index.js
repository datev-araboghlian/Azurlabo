const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
    res.render('index');
});

// About page
router.get('/about', (req, res) => {
    res.render('about');
});

// Shop page
router.get('/shop', async (req, res) => {
    // Temporary sample products
    const products = [
        {
            name: 'Sample Product 1',
            price: 99.99,
            description: 'This is a sample product'
        },
        {
            name: 'Sample Product 2',
            price: 149.99,
            description: 'This is another sample product'
        }
    ];
    res.render('shop', { products });
});

// Payment success page
router.get('/success', (req, res) => {
    res.render('success', { message: 'Payment successful! Thank you for your purchase.' });
});

// Payment cancel page
router.get('/cancel', (req, res) => {
    res.render('cancel', { message: 'Payment was cancelled.' });
});

module.exports = router;
