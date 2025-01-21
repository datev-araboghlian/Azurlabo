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
    // Sample products
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

module.exports = router;
