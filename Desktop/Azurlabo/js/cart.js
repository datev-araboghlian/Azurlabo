// Shopping Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image
            });
        }
        saveCart();
        updateCartCount();
        showAddedToCartMessage(product.name);
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    displayCart();
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, parseInt(newQuantity) || 1);
        saveCart();
        displayCart();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
    });
}

function displayCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems || !cartTotal) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }

    let total = 0;
    cartItems.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="cart-item mb-3">
                <div class="row align-items-center">
                    <div class="col-2">
                        <img src="${item.image}" alt="${item.name}" class="img-fluid rounded"
                             onerror="this.src='images/general/placeholder.jpg'">
                    </div>
                    <div class="col-4">
                        <h6 class="mb-0">${item.name}</h6>
                    </div>
                    <div class="col-2">
                        <input type="number" class="form-control" value="${item.quantity}" min="1"
                               onchange="updateQuantity(${item.id}, this.value)">
                    </div>
                    <div class="col-2">
                        $${item.price.toLocaleString('en-US', {minimumFractionDigits: 2})}
                    </div>
                    <div class="col-2">
                        <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    cartTotal.textContent = total.toLocaleString('en-US', {minimumFractionDigits: 2});
}

function showAddedToCartMessage(productName) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = `${productName} added to cart`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 2000);
    }, 100);
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }
    
    // Here you would typically redirect to a checkout page
    // For now, we'll just show a success message
    alert('Thank you for your order! We will contact you shortly to confirm your purchase.');
    cart = [];
    saveCart();
    updateCartCount();
    const modal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    if (modal) {
        modal.hide();
    }
}

// Initialize cart display when cart modal is shown
document.addEventListener('DOMContentLoaded', function() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.addEventListener('show.bs.modal', function() {
            displayCart();
        });
    }
});
