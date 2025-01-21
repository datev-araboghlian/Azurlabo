// Product data
const products = [
    {
        id: 1,
        name: 'A-dec 500 Dental Chair',
        price: 15999.99,
        category: 'chairs',
        description: 'Premium dental chair with advanced positioning system, LED lighting, and integrated touchpad controls',
        features: [
            'Pressure-mapped upholstery',
            '4-way adjustable headrest',
            'Integrated USB ports',
            'Seamless infection control',
            'Virtual pivot technology'
        ],
        image: 'images/chairs/dental-chair-1.jpg'
    },
    {
        id: 2,
        name: 'ProDental Instrument Set',
        price: 2499.99,
        category: 'instruments',
        description: 'Complete set of professional-grade dental instruments in surgical steel',
        features: [
            'Autoclavable case',
            'Ergonomic handles',
            'Premium stainless steel',
            'Lifetime warranty',
            '24 essential instruments'
        ],
        image: 'images/instruments/instrument-set-1.jpg'
    },
    {
        id: 3,
        name: 'PlanmecaProMax 3D',
        price: 75999.99,
        category: 'imaging',
        description: 'Advanced 3D imaging system with CBCT, panoramic, and cephalometric capabilities',
        features: [
            'Ultra-low dose imaging',
            'Face photo feature',
            'Digital smile design',
            'Real-time jaw movement',
            'Advanced visualization'
        ],
        image: 'images/imaging/imaging-system-1.jpg'
    },
    {
        id: 4,
        name: 'DentalEZ LED Operating Light',
        price: 3999.99,
        category: 'instruments',
        description: 'Advanced LED dental operatory light with shadow-free illumination',
        features: [
            'Color temperature control',
            'No-touch sensors',
            'Multiple intensity settings',
            'Composite-safe mode',
            'Articulating arm'
        ],
        image: 'images/instruments/dental-light-1.jpg'
    },
    {
        id: 5,
        name: 'SternWeber S280TRC Chair',
        price: 12999.99,
        category: 'chairs',
        description: 'Ergonomic dental unit with integrated delivery system',
        features: [
            'Memory foam cushioning',
            'Programmable positions',
            'Ambidextrous configuration',
            'Integrated foot control',
            'Multi-axis movement'
        ],
        image: 'images/chairs/dental-chair-2.jpg'
    },
    {
        id: 6,
        name: 'VistaScan Mini Digital X-Ray',
        price: 8999.99,
        category: 'imaging',
        description: 'Compact digital imaging scanner for intraoral X-rays',
        features: [
            'High resolution scanning',
            'Network integration',
            'Quick scan time',
            'Space-saving design',
            'Easy maintenance'
        ],
        image: 'images/imaging/xray-system-1.jpg'
    }
];

// Function to create product card HTML
function createProductCard(product) {
    return `
        <div class="col-md-4 mb-4">
            <div class="card product-card">
                <img src="${product.image}" class="card-img-top product-image" alt="${product.name}" 
                     onerror="this.src='images/general/placeholder.jpg'">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text"><strong>$${product.price.toLocaleString('en-US', {minimumFractionDigits: 2})}</strong></p>
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-primary" onclick="showProductDetails(${product.id})">View Details</button>
                        <button class="btn btn-success" onclick="addToCart(${product.id})">
                            <i class="bi bi-cart-plus"></i> Add to Cart
                        </button>
                    </div>
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

// Function to show product details
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const detailsHTML = `
            <div class="modal fade" id="productModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${product.name}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <img src="${product.image}" class="img-fluid" alt="${product.name}"
                                         onerror="this.src='images/general/placeholder.jpg'">
                                </div>
                                <div class="col-md-6">
                                    <p>${product.description}</p>
                                    <h6>Key Features:</h6>
                                    <ul>
                                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                                    </ul>
                                    <p class="h4 mt-3">Price: $${product.price.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onclick="contactUs('${product.name}')">Contact for Quote</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal if any
        const existingModal = document.getElementById('productModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Add new modal to body
        document.body.insertAdjacentHTML('beforeend', detailsHTML);

        // Show the modal
        const modal = new bootstrap.Modal(document.getElementById('productModal'));
        modal.show();
    }
}

// Function to handle contact for quote
function contactUs(productName) {
    const email = 'info@azurlabo.com';
    const subject = encodeURIComponent(`Quote Request for ${productName}`);
    const body = encodeURIComponent(`I am interested in getting a quote for the ${productName}. Please provide more information.`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
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
