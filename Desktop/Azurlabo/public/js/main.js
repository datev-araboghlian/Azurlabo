// Initialize EmailJS
emailjs.init("YOUR_EMAIL_JS_PUBLIC_KEY");

// Cart functionality
class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.saveCart();
        this.updateCartCount();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = parseInt(quantity);
            if (item.quantity <= 0) {
                this.removeItem(productId);
            }
        }
        this.saveCart();
        this.updateCartCount();
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = this.items.reduce((total, item) => total + item.quantity, 0);
        }
    }
}

// Initialize cart
const cart = new Cart();

// Payment processing
const stripe = Stripe('your_stripe_publishable_key');

async function processStripePayment() {
    try {
        const response = await fetch('/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: cart.getTotal(),
                currency: 'usd'
            })
        });
        
        const data = await response.json();
        const result = await stripe.confirmCardPayment(data.clientSecret, {
            payment_method: {
                card: elements.getElement('card'),
                billing_details: {
                    name: document.getElementById('name').value
                }
            }
        });

        if (result.error) {
            showError(result.error.message);
        } else {
            handlePaymentSuccess();
        }
    } catch (error) {
        showError('An error occurred during payment processing.');
    }
}

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
                .then(function() {
                    alert('Message sent successfully!');
                    contactForm.reset();
                }, function(error) {
                    alert('Error sending message. Please try again.');
                });
        });
    }
});

// Add to cart button handlers
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = e.target.dataset.productId;
        const product = {
            id: productId,
            name: e.target.dataset.name,
            price: parseFloat(e.target.dataset.price)
        };
        cart.addItem(product);
        
        // Show success message
        const toast = document.createElement('div');
        toast.classList.add('toast', 'show', 'position-fixed', 'bottom-0', 'end-0', 'm-3');
        toast.innerHTML = `
            <div class="toast-header">
                <strong class="me-auto">Success!</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">
                ${product.name} has been added to your cart.
            </div>
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
});
