// Product data
const products = [
    {
        id: 1,
        name: 'Premium Dental Chair',
        price: 2999.99,
        category: 'chairs',
        description: 'High-quality dental chair with advanced positioning system',
        image: 'images/dental-chair.jpg'
    },
    {
        id: 2,
        name: 'Professional Instrument Set',
        price: 799.99,
        category: 'instruments',
        description: 'Complete set of professional dental instruments',
        image: 'images/instrument-set.jpg'
    },
    {
        id: 3,
        name: 'Digital X-Ray System',
        price: 4999.99,
        category: 'imaging',
        description: 'Advanced digital X-ray imaging system',
        image: 'images/xray-system.jpg'
    },
    {
        id: 4,
        name: 'Dental Light',
        price: 599.99,
        category: 'instruments',
        description: 'LED dental examination light',
        image: 'images/dental-light.jpg'
    }
];

// Function to create product card HTML
function createProductCard(product) {
    return `
        <div class="col-md-4 mb-4">
            <div class="card product-card">
                <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text"><strong>$${product.price.toFixed(2)}</strong></p>
                    <button class="btn btn-primary" onclick="showProductDetails(${product.id})">View Details</button>
                </div>
            </div>
        </div>
    `;
}

// Function to display products
function displayProducts(category = 'all') {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);

    productsGrid.innerHTML = filteredProducts.map(createProductCard).join('');
}

// Function to display featured products on home page
function displayFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;

    // Display first 3 products as featured
    const featuredProducts = products.slice(0, 3);
    featuredContainer.innerHTML = featuredProducts.map(createProductCard).join('');
}

// Function to show product details (can be expanded)
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        alert(`${product.name}\n\nPrice: $${product.price}\n${product.description}`);
    }
}

// Event listeners for category buttons
document.addEventListener('DOMContentLoaded', function() {
    // Initialize products display
    displayProducts();
    displayFeaturedProducts();

    // Add event listeners to category buttons
    const categoryButtons = document.querySelectorAll('[data-category]');
    categoryButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            e.target.classList.add('active');
            // Display products for selected category
            displayProducts(e.target.dataset.category);
        });
    });
});
