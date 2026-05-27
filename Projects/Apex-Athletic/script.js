// Products Data (imported from apex_products.json when available)
const products = [
    { id: 1, name: "Nike React Miler", category: "shoes", price: 130.00, image: "images/site-1.jpg", description: "", rating: 4.5, reviews: 120 },
    { id: 2, name: "Nike Air Zoom Pegasus 37", category: "shoes", price: 120.00, image: "images/site-2.jpg", description: "", rating: 4.5, reviews: 98 },
    { id: 3, name: "Nike Joyride Run Flyknit", category: "shoes", price: 170.00, image: "images/site-3.jpg", description: "", rating: 4.4, reviews: 85 },
    { id: 4, name: "Nike Mercurial Vapor 13 Elite FG", category: "shoes", price: 250.00, image: "images/site-4.jpg", description: "", rating: 4.6, reviews: 64 },
    { id: 5, name: "Nike Phantom Vision Elite Dynamic Fit FG", category: "shoes", price: 280.00, image: "images/site-5.jpg", description: "", rating: 4.6, reviews: 72 },
    { id: 6, name: "Nike Phantom Venom Academy FG", category: "shoes", price: 150.00, image: "images/site-6.jpg", description: "", rating: 4.4, reviews: 54 },
    { id: 7, name: "Nike Mercurial Vapor 13 Elite Tech Craft FG", category: "shoes", price: 280.00, image: "images/site-7.jpg", description: "", rating: 4.7, reviews: 41 },
    { id: 8, name: "Nike Mercurial Superfly 7 Pro MDS FG", category: "shoes", price: 270.00, image: "images/site-8.jpg", description: "", rating: 4.7, reviews: 53 },
    { id: 9, name: "Nike Air Force 1", category: "shoes", price: 120.00, image: "images/site-9.jpg", description: "", rating: 4.6, reviews: 210 },
    { id: 10, name: "Nike Air Max 90", category: "shoes", price: 140.00, image: "images/site-10.jpg", description: "", rating: 4.5, reviews: 147 },
    { id: 11, name: "Nike Air Max 90 LTR", category: "shoes", price: 160.00, image: "images/site-11.jpg", description: "", rating: 4.5, reviews: 93 },
    { id: 12, name: "Nike Joyride Dual Run", category: "shoes", price: 140.00, image: "images/site-12.jpg", description: "", rating: 4.4, reviews: 67 },
    { id: 13, name: "Nike Renew Run", category: "shoes", price: 110.00, image: "images/site-13.jpg", description: "", rating: 4.3, reviews: 88 },
    { id: 14, name: "Nizza X Disney", category: "shoes", price: 100.00, image: "images/site-14.jpg", description: "", rating: 4.2, reviews: 52 },
    { id: 15, name: "X_PLR", category: "shoes", price: 130.00, image: "images/site-15.jpg", description: "", rating: 4.3, reviews: 46 },
    { id: 16, name: "NMD_R1", category: "shoes", price: 180.00, image: "images/site-16.jpg", description: "", rating: 4.5, reviews: 71 }
];

// Attempt to load products from `apex_products.json` at runtime and replace the
// built-in `products` array. This allows the scraper to append real product
// entries and images (images paths should be relative, e.g. `images/nike/..`).
async function tryLoadExternalProducts() {
    try {
        const resp = await fetch('apex_products.json', { cache: 'no-store' });
        if (!resp.ok) return;
        const external = await resp.json();
        if (!Array.isArray(external) || external.length === 0) return;

        // Map external format to site product objects
        const startId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        const mapped = external.map((p, idx) => ({
            id: startId + idx,
            name: p.name || p.title || 'Product',
            category: p.category || 'shoes',
            price: parseFloat((p.price || p.priceValue || '').toString().replace(/[^0-9.]/g, '')) || 0,
            image: p.image || p.img || '',
            description: p.description || '',
            rating: p.rating || 4.5,
            reviews: p.reviews || 0
        }));

        // Replace products array with built-in ones followed by external
        products.length = 0;
        Array.prototype.push.apply(products, mapped);
        // Refresh the product grid
        try { loadProducts(); } catch (e) { console.warn('loadProducts failed after external load', e); }
        console.log('Loaded', mapped.length, 'products from apex_products.json');
    } catch (err) {
        console.warn('Could not load apex_products.json:', err.message);
    }
}

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cart')) || {};
let currentFilter = 'all';
let currentLanguage = localStorage.getItem('language') || 'en';

// Translations
const translations = {
    en: {
        home: "Home",
        shop: "Shop",
        about: "About",
        contact: "Contact",
        cart_title: "Shopping Cart",
        checkout: "Checkout",
        clear_cart: "Clear Cart",
        complete_purchase: "Complete Purchase",
        shop_now: "Shop Now",
        our_collection: "Our Collection",
        all: "All",
        shoes: "Shoes",
        apparel: "Apparel",
        accessories: "Accessories",
        about_title: "About APEX",
        about_text: "APEX is a premium athletic brand dedicated to providing high-quality sports apparel, shoes, and accessories for athletes of all levels. We combine innovation, comfort, and style to help you reach your peak performance.",
        quality: "Quality",
        quality_desc: "Premium materials and expert craftsmanship",
        innovation: "Innovation",
        innovation_desc: "Cutting-edge technology for performance",
        sustainability: "Sustainability",
        sustainability_desc: "Eco-friendly production practices",
        contact_title: "Contact Us",
        name_placeholder: "Your Name",
        email_placeholder: "Your Email",
        message_placeholder: "Your Message",
        send_message: "Send Message",
        where_performance: "Where Performance Meets Style",
        subtotal: "Subtotal: $",
        tax: "Tax (10%): $",
        total: "Total: $",
        shipping_info: "Shipping Information",
        full_name: "Full Name",
        address: "Address",
        city: "City",
        zip_code: "ZIP Code",
        payment_info: "Payment Information",
        card_number: "Card Number",
        expiry: "MM/YY",
        cvv: "CVV",
        order_confirmed: "Order Confirmed",
        thank_you: "Thank you for your purchase!",
        order_id: "Order ID:",
        email_confirmation: "You will receive a confirmation email shortly.",
        continue_shopping: "Continue Shopping",
        add_to_cart: "Add to Cart",
        your_cart_empty: "Your cart is empty",
        copyright: "© 2026 APEX Athletic. All rights reserved.",
        account: "Account",
        payment_methods: "Payment Methods",
        manage_payment: "Manage Payment Methods",
        add_card: "Add Card",
        saved_cards: "Saved Cards",
        card_type: "Card Type",
        save_card: "Save Card",
        remove_card: "Remove Card",
        add_payment_method: "Add Payment Method",
        card_saved: "Card saved successfully!",
        card_removed: "Card removed successfully!",
        card_ending_in: "Card ending in"
    },
    sq: {
        home: "Kreu",
        shop: "Dyqani",
        about: "Rreth nesh",
        contact: "Kontakt",
        cart_title: "Shporta e Blerjeve",
        checkout: "Paguaj",
        clear_cart: "Zbraz Shportën",
        complete_purchase: "Përfundo Blerjen",
        shop_now: "Bleni Tani",
        our_collection: "Koleksioni Ynë",
        all: "Të Gjitha",
        shoes: "Këpucë",
        apparel: "Rroba",
        accessories: "Aksesorë",
        about_title: "Rreth APEX",
        about_text: "APEX është një markë atletike premium e dedikuar për të siguruar veshje sportive me cilësi të lartë, këpucë dhe aksesorë për atletët e të gjithë niveleve. Ne kombinojmë inovacionin, komoditetin dhe stilin për t'ju ndihmuar të arrini përfeksionin tuaj.",
        quality: "Cilësia",
        quality_desc: "Materiale premium dhe zanati i ekspertëve",
        innovation: "Inovacioni",
        innovation_desc: "Teknologjia e prerë për performancën",
        sustainability: "Qëndrueshmëria",
        sustainability_desc: "Praktikat e prodhimit miqësore me mjedisin",
        contact_title: "Na Kontaktoni",
        name_placeholder: "Emri Juaj",
        email_placeholder: "Email-i Juaj",
        message_placeholder: "Mesazhi Juaj",
        send_message: "Dërgo Mesazh",
        where_performance: "Ku Përformancat Plotësohen me Stilin",
        subtotal: "Nënshuma: $",
        tax: "Tatim (10%): $",
        total: "Gjithsej: $",
        shipping_info: "Informacioni i Dërgimit",
        full_name: "Emri i Plotë",
        address: "Adresa",
        city: "Qyteti",
        zip_code: "Kodi Postar",
        payment_info: "Informacioni i Pagesës",
        card_number: "Numri i Kartës",
        expiry: "MM/YY",
        cvv: "CVV",
        order_confirmed: "Porosi e Konfirmuar",
        thank_you: "Faleminderit për blerjen tuaj!",
        order_id: "ID e Porosis:",
        email_confirmation: "Ju do të merrni një email konfirmimi se shpejti.",
        continue_shopping: "Vazhdoni të Blini",
        add_to_cart: "Shto në Shportë",
        your_cart_empty: "Shporta juaj është bosh",
        copyright: "© 2026 APEX Athletic. Të gjitha të drejtat e rezervuara.",
        account: "Llogaria",
        payment_methods: "Metodat e Pagesës",
        manage_payment: "Menaxhoni Metodat e Pagesës",
        add_card: "Shto Kartë",
        saved_cards: "Kartat e Ruajtura",
        card_type: "Lloji i Kartës",
        save_card: "Ruaj Kartën",
        remove_card: "Hiq Kartën",
        add_payment_method: "Shto Metodë Pagese",
        card_saved: "Karta u ruajt me sukses!",
        card_removed: "Karta u hoq me sukses!",
        card_ending_in: "Karta përfundon me"
    }
};

// Switch Language
function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update active button (safe: don't rely on event)
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        const txt = btn.textContent.trim().toLowerCase();
        if ((lang === 'en' && txt === 'eng') || (lang === 'sq' && txt === 'sq')) {
            btn.classList.add('active');
        }
    });
    
    // Update page content
    updatePageLanguage();
}

// Update all text on page
function updatePageLanguage() {
    const t = translations[currentLanguage];
    
    // Navigation
    document.querySelectorAll('.nav-link')[0].textContent = t.home;
    document.querySelectorAll('.nav-link')[1].textContent = t.shop;
    document.querySelectorAll('.nav-link')[2].textContent = t.about;
    document.querySelectorAll('.nav-link')[3].textContent = t.contact;
    
    // Hero
    document.querySelector('.hero-content h1').textContent = 'APEX ATHLETIC';
    document.querySelector('.hero-content p').textContent = t.where_performance;
    document.querySelector('.hero .btn').textContent = t.shop_now;
    
    // Products Section
    document.querySelector('.products-section h2').textContent = t.our_collection;
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns && filterBtns.length >= 4) {
        filterBtns[0].textContent = t.all;
        filterBtns[1].textContent = t.shoes;
        filterBtns[2].textContent = t.apparel;
        filterBtns[3].textContent = t.accessories;
    }
    
    // About
    document.querySelector('.about h2').textContent = t.about_title;
    document.querySelector('.about > p').textContent = t.about_text;
    document.querySelectorAll('.feature')[0].querySelector('h3').textContent = t.quality;
    document.querySelectorAll('.feature')[0].querySelector('p').textContent = t.quality_desc;
    document.querySelectorAll('.feature')[1].querySelector('h3').textContent = t.innovation;
    document.querySelectorAll('.feature')[1].querySelector('p').textContent = t.innovation_desc;
    document.querySelectorAll('.feature')[2].querySelector('h3').textContent = t.sustainability;
    document.querySelectorAll('.feature')[2].querySelector('p').textContent = t.sustainability_desc;
    
    // Contact
    document.querySelector('.contact h2').textContent = t.contact_title;
    document.querySelectorAll('.contact-form input')[0].placeholder = t.name_placeholder;
    document.querySelectorAll('.contact-form input')[1].placeholder = t.email_placeholder;
    document.querySelector('.contact-form textarea').placeholder = t.message_placeholder;
    document.querySelector('.contact-form .btn').textContent = t.send_message;
    
    // Footer
    document.querySelector('.footer p').textContent = t.copyright;
    
    // Reload products with translated names
    loadProducts();
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('language') || 'en';
    if (savedLang === 'sq') {
        document.querySelectorAll('.lang-btn')[1].classList.add('active');
        document.querySelectorAll('.lang-btn')[0].classList.remove('active');
    }
    try {
        updatePageLanguage();
    } catch (e) {
        console.error('updatePageLanguage error:', e);
        // Ensure products still load if language update fails
        try { loadProducts(); } catch (e2) { console.error(e2); }
    }
    updateCartCount();
});

// Backup load on window load
window.addEventListener('load', function() {
    const grid = document.getElementById('products-grid');
    if (grid && grid.children.length === 0) {
        loadProducts();
    }
});

// Load and Display Products
function loadProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    
    const filteredProducts = currentFilter === 'all' 
        ? products 
        : products.filter(p => p.category === currentFilter);
    
    filteredProducts.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const rating = '⭐'.repeat(Math.floor(product.rating));

    card.innerHTML = `
        <div class="product-image" style="background-image: url('${product.image}'); background-size: cover; background-position: center;"></div>
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-description">${product.description}</div>
            <div class="product-rating">${rating} (${product.reviews})</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="product-actions">
                <select id="qty-${product.id}">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>
                <button class="card-add-btn">Add to Cart</button>
            </div>
        </div>
    `;

    // Open product modal when clicking the card, except when clicking the actions area
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.product-actions')) {
            showProductModal(product);
        }
    });

    // Wire up add to cart button inside the card
    const addBtn = card.querySelector('.card-add-btn');
    addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const qtySelect = card.querySelector(`#qty-${product.id}`);
        const qty = parseInt(qtySelect.value);
        addToCart(product.id, qty);
    });

    return card;
}

// Filter Products
function filterProducts(category) {
    currentFilter = category;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Find and mark the clicked button as active
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.textContent.toLowerCase() === category || 
            (category === 'all' && btn.textContent.toLowerCase() === 'all') ||
            (category === 'shoes' && btn.textContent.toLowerCase() === 'shoes') ||
            (category === 'apparel' && btn.textContent.toLowerCase() === 'apparel') ||
            (category === 'accessories' && btn.textContent.toLowerCase() === 'accessories')) {
            btn.classList.add('active');
        }
    });
    
    loadProducts();
}

// Add to Cart
function addToCart(productId, quantityParam) {
    const product = products.find(p => p.id === productId);
    const quantity = typeof quantityParam === 'number' ? quantityParam : parseInt(document.getElementById(`qty-${productId}`).value);

    if (cart[productId]) {
        cart[productId].quantity += quantity;
    } else {
        cart[productId] = {
            product: product,
            quantity: quantity
        };
    }

    saveCart();
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

// Update Cart Count
function updateCartCount() {
    let count = 0;
    for (let id in cart) {
        count += cart[id].quantity;
    }
    document.getElementById('cart-count').textContent = count;
}

// Toggle Cart Modal
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
        displayCartItems();
        updateCartSummary();
    }
}

// Display Cart Items
function displayCartItems() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    
    if (Object.keys(cart).length === 0) {
        cartItemsDiv.innerHTML = '<p style="text-align: center; color: #999;">Your cart is empty</p>';
        return;
    }
    
    for (let id in cart) {
        const item = cart[id];
        const itemTotal = (item.product.price * item.quantity).toFixed(2);
        
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.product.name}</div>
                <div class="cart-item-price">$${item.product.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-quantity">
                <button onclick="updateQuantity(${id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${id}, 1)">+</button>
            </div>
            <div>$${itemTotal}</div>
            <button class="cart-item-remove" onclick="removeFromCart(${id})">Remove</button>
        `;
        
        cartItemsDiv.appendChild(itemDiv);
    }
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart[productId];
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        updateCartCount();
        displayCartItems();
        updateCartSummary();
    }
}

// Remove from Cart
function removeFromCart(productId) {
    delete cart[productId];
    saveCart();
    updateCartCount();
    displayCartItems();
    updateCartSummary();
}

// Clear Cart
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = {};
        saveCart();
        updateCartCount();
        displayCartItems();
        updateCartSummary();
    }
}

// Update Cart Summary
function updateCartSummary() {
    let subtotal = 0;
    
    for (let id in cart) {
        const item = cart[id];
        subtotal += item.product.price * item.quantity;
    }
    
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('tax').textContent = tax.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
}

// Checkout
function checkout() {
    if (Object.keys(cart).length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    document.getElementById('cart-modal').style.display = 'none';
    document.getElementById('checkout-modal').style.display = 'block';
    
    // Load saved payment methods
    loadSavedCardsInCheckout();
    togglePaymentFields();
}

// Close Checkout
function closeCheckout() {
    document.getElementById('checkout-modal').style.display = 'none';
}

// Complete Checkout
function completeCheckout(event) {
    event.preventDefault();

    const form = event.target;
    const fullName = form.fullName ? form.fullName.value : '';
    const email = form.email ? form.email.value : '';

    const paymentMethod = form.paymentMethod ? form.paymentMethod.value : 'card';

    let cardNumber = '';
    let expiry = '';
    let cvv = '';

    // If card payment selected, perform simple client-side validation
    if (paymentMethod === 'card') {
        // Check if a saved card is selected
        const savedCardInput = document.querySelector('input[name="savedCard"]:checked');
        
        if (savedCardInput) {
            // Use saved card
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const allPayments = JSON.parse(localStorage.getItem('apexPayments') || '{}');
            const userPayments = allPayments[currentUser.email] || [];
            const selectedCard = userPayments[savedCardInput.value];
            
            if (selectedCard) {
                cardNumber = selectedCard.number;
                expiry = selectedCard.expiry;
                cvv = selectedCard.cvv;
            } else {
                alert('Selected card not found');
                return;
            }
        } else {
            // Use manually entered card
            cardNumber = form.cardNumber ? form.cardNumber.value.replace(/\s+/g, '') : '';
            expiry = form.expiry ? form.expiry.value.trim() : '';
            cvv = form.cvv ? form.cvv.value.trim() : '';
            
            // If new card section is visible, validate the input
            const addNewCardSection = document.getElementById('add-new-card-section');
            if (addNewCardSection && addNewCardSection.style.display !== 'none') {
                if (!cardNumber || cardNumber.length < 12 || cardNumber.length > 19 || !/^[0-9]+$/.test(cardNumber)) {
                    alert('Please enter a valid card number');
                    return;
                }
                if (!/^[0-9]{2}\/[0-9]{2}$/.test(expiry)) {
                    alert('Expiry must be in MM/YY format');
                    return;
                }
                if (!/^[0-9]{3,4}$/.test(cvv)) {
                    alert('Please enter a valid CVV');
                    return;
                }
            } else {
                // If new card section is not visible and no saved card selected, show error
                alert('Please select a saved card or add a new card');
                return;
            }
        }
    }

    if (Object.keys(cart).length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Build summary HTML for purchased items
    let itemsHtml = '<ul style="padding-left:1rem">';
    let total = 0;
    for (let productId in cart) {
        const item = cart[productId];
        const itemTotal = item.product.price * item.quantity;
        total += itemTotal;
        itemsHtml += `<li>${item.product.name} x${item.quantity} — $${itemTotal.toFixed(2)}</li>`;
    }
    itemsHtml += '</ul>';

    // Populate confirmation modal with name, email and items
    document.getElementById('confirm-name').textContent = fullName;
    document.getElementById('confirm-email').textContent = email;
    document.getElementById('confirm-payment').textContent = paymentMethod === 'card' ? ('Card ending ' + cardNumber.slice(-4)) : 'Cash (pay on delivery)';
    document.getElementById('confirm-items').innerHTML = itemsHtml;
    document.getElementById('confirm-total').textContent = total.toFixed(2);

    // Try to submit sanitized data to Formspree so you receive an email
    (async () => {
        try {
            // Build sanitized FormData
            const fd = new FormData();
            fd.append('fullName', fullName);
            fd.append('email', email);
            fd.append('address', form.address ? form.address.value : '');
            fd.append('city', form.city ? form.city.value : '');
            fd.append('zipCode', form.zipCode ? form.zipCode.value : '');
            fd.append('paymentMethod', paymentMethod);
            // include masked card last4 if card selected
            if (paymentMethod === 'card' && cardNumber) {
                fd.append('cardLast4', cardNumber.slice(-4));
            }
            fd.append('cartItems', itemsHtml.replace(/<[^>]+>/g, '\n'));
            fd.append('total', total.toFixed(2));

            const actionUrl = form.action || '/';
            const resp = await fetch(actionUrl, { method: 'POST', body: fd, headers: { 'Accept': 'application/json' } });
            if (!resp.ok) {
                console.warn('Formspree submission returned non-OK status', resp.status);
                // Attempt mailto fallback using the site's contact email if available
                try {
                    const mailAnchor = document.querySelector('a[href^="mailto:"]');
                    const recipient = mailAnchor ? mailAnchor.getAttribute('href').replace('mailto:', '') : '';
                    if (recipient) {
                        const subject = encodeURIComponent('New Order from APEX Athletic - ' + fullName);
                        const bodyLines = [];
                        bodyLines.push('Name: ' + fullName);
                        bodyLines.push('Email: ' + email);
                        bodyLines.push('Payment method: ' + (paymentMethod === 'card' ? ('Card ending ' + (cardNumber ? cardNumber.slice(-4) : '')) : 'Cash (pay on delivery)'));
                        bodyLines.push('\nItems:');
                        bodyLines.push(itemsHtml.replace(/<[^>]+>/g, '\n'));
                        bodyLines.push('\nTotal: $' + total.toFixed(2));
                        const mailto = `mailto:${recipient}?subject=${subject}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
                        window.location.href = mailto;
                        showNotification('Opened your mail client to send the order (fallback)');
                    } else {
                        console.warn('No mailto recipient found for fallback');
                    }
                } catch (mf) {
                    console.error('Mailto fallback failed', mf);
                }
            }
        } catch (err) {
            console.error('Error sending checkout to Formspree:', err);
        } finally {
            // Show confirmation and clear checkout modal regardless of email result
            document.getElementById('checkout-modal').style.display = 'none';
            document.getElementById('confirmation-modal').style.display = 'block';

            // Clear cart locally
            cart = {};
            saveCart();
            updateCartCount();
        }
    })();
}


// Close Confirmation
function closeConfirmation() {
    document.getElementById('confirmation-modal').style.display = 'none';
    document.getElementById('checkout-modal').style.display = 'none';
}

// Handle Contact Submit
function handleContactSubmit(event) {
    // Form will auto-submit to Formspree
}

// Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #00d4ff;
        color: black;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        font-weight: bold;
        z-index: 300;
        animation: slideIn 0.3s;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Close modal when clicking outside
window.onclick = function(event) {
    const cartModal = document.getElementById('cart-modal');
    const checkoutModal = document.getElementById('checkout-modal');
    const confirmationModal = document.getElementById('confirmation-modal');
    const productModal = document.getElementById('product-modal');
    
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
    if (event.target === checkoutModal) {
        checkoutModal.style.display = 'none';
    }
    if (event.target === confirmationModal) {
        confirmationModal.style.display = 'none';
    }
    if (productModal && event.target === productModal) {
        productModal.style.display = 'none';
    }
}

// Add animation styles
const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Payment fields toggle and form hookup
function loadSavedCardsInCheckout() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    const allPayments = JSON.parse(localStorage.getItem('apexPayments') || '{}');
    const userPayments = allPayments[currentUser.email] || [];
    
    const savedCardsList = document.getElementById('saved-cards-list');
    if (!savedCardsList) return;
    
    savedCardsList.innerHTML = '';
    
    if (userPayments.length === 0) {
        savedCardsList.innerHTML = '<p style="color: #999; font-size: 0.9rem;">No saved cards. Add a new payment method below.</p>';
        return;
    }
    
    const title = document.createElement('p');
    title.textContent = 'Saved Payment Methods:';
    title.style.cssText = 'margin-bottom: 0.5rem; color: #333; font-weight: bold;';
    savedCardsList.appendChild(title);
    
    userPayments.forEach((payment, index) => {
        const lastFour = payment.number.replace(/\s+/g, '').slice(-4);
        const label = document.createElement('label');
        label.style.cssText = 'display: block; margin-bottom: 0.5rem; padding: 0.5rem; background: #f5f5f5; border-radius: 5px; cursor: pointer;';
        
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'savedCard';
        input.value = index;
        input.style.marginRight = '0.5rem';
        
        const text = document.createElement('span');
        text.textContent = `${payment.type} ending in ${lastFour}`;
        
        label.appendChild(input);
        label.appendChild(text);
        savedCardsList.appendChild(label);
    });
    
    const divider = document.createElement('p');
    divider.textContent = 'Or';
    divider.style.cssText = 'text-align: center; color: #999; margin: 1rem 0; font-size: 0.9rem;';
    savedCardsList.appendChild(divider);
}

function togglePaymentFields() {
    const method = document.querySelector('input[name="paymentMethod"]:checked')?.value;
    const cardFields = document.getElementById('card-fields');
    if (!cardFields) return;
    if (method === 'card') {
        cardFields.style.display = 'block';
    } else {
        cardFields.style.display = 'none';
        // Hide the add new card section when switching to cash
        const addNewCardSection = document.getElementById('add-new-card-section');
        const addNewCardBtn = document.getElementById('add-new-card-btn');
        if (addNewCardSection) {
            addNewCardSection.style.display = 'none';
            if (addNewCardBtn) {
                addNewCardBtn.textContent = '+ Add New Card';
                addNewCardBtn.classList.remove('active');
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // wire payment method radios
    const radios = document.querySelectorAll('input[name="paymentMethod"]');
    radios.forEach(r => r.addEventListener('change', togglePaymentFields));
    // initialize display
    togglePaymentFields();

    // attach checkout form submit handler
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) checkoutForm.addEventListener('submit', completeCheckout);
    
    // Handle "Add New Card" button
    const addNewCardBtn = document.getElementById('add-new-card-btn');
    if (addNewCardBtn) {
        addNewCardBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const section = document.getElementById('add-new-card-section');
            const isHidden = section.style.display === 'none';
            
            if (isHidden) {
                section.style.display = 'block';
                addNewCardBtn.textContent = '- Hide Card Details';
                addNewCardBtn.classList.add('active');
            } else {
                section.style.display = 'none';
                addNewCardBtn.textContent = '+ Add New Card';
                addNewCardBtn.classList.remove('active');
                // Clear the inputs when hiding
                document.getElementById('cardNumber').value = '';
                document.getElementById('cardExpiry').value = '';
                document.getElementById('cardCvv').value = '';
            }
        });
    }
});

// Hamburger Menu Functions
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Product Modal Functions
function showProductModal(product) {
    const modal = document.getElementById('product-modal');
    if (!modal) return;

    document.getElementById('product-image-large').style.backgroundImage = `url('${product.image}')`;
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('product-desc').textContent = product.description || '';

    const sizeOptions = document.getElementById('size-options');
    sizeOptions.innerHTML = '';

    let sizes = [];
    if (product.category === 'shoes') sizes = ['6','7','8','9','10','11','12'];
    else if (product.category === 'apparel') sizes = ['XS','S','M','L','XL'];
    else if (product.category === 'accessories') sizes = ['One Size'];

    sizes.forEach((s, i) => {
        const btn = document.createElement('button');
        btn.className = 'size-btn';
        btn.textContent = s;
        btn.addEventListener('click', () => {
            sizeOptions.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
        if (i === 0) btn.classList.add('active');
        sizeOptions.appendChild(btn);
    });

    // set modal add-to-cart behavior
    const modalAdd = document.getElementById('modal-add-to-cart');
    modalAdd.onclick = function() {
        const qty = parseInt(document.getElementById('modal-qty').value);
        addToCart(product.id, qty);
        modal.style.display = 'none';
    };

    modal.style.display = 'block';
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    if (modal) modal.style.display = 'none';
}

// ========== AUTHENTICATION FUNCTIONS ==========

// Check if user is already logged in on page load
window.addEventListener('DOMContentLoaded', function() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        updateAuthUI(JSON.parse(currentUser));
    }
});

function openLoginModal() {
    document.getElementById('login-modal').style.display = 'block';
    closeSignupModal();
    document.getElementById('login-error').textContent = '';
}

function closeLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
}

function openSignupModal() {
    document.getElementById('signup-modal').style.display = 'block';
    closeLoginModal();
    document.getElementById('signup-error').textContent = '';
}

function closeSignupModal() {
    document.getElementById('signup-modal').style.display = 'none';
}

function switchAuthForm() {
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    
    if (loginModal.style.display === 'block') {
        closeLoginModal();
        openSignupModal();
    } else {
        closeSignupModal();
        openLoginModal();
    }
    return false;
}

function updateAuthUI(user) {
    // Update desktop version
    const authButtons = document.getElementById('auth-buttons');
    const userMenu = document.getElementById('user-menu');
    const userEmail = document.getElementById('user-email');
    
    if (authButtons) authButtons.style.display = 'none';
    if (userMenu) userMenu.style.display = 'flex';
    if (userEmail) userEmail.textContent = user.email;
    
    // Update mobile version
    const mobileAuthBtns = document.getElementById('mobile-auth-btns');
    const mobileUserMenu = document.getElementById('mobile-user-menu');
    const mobileUserEmail = document.getElementById('mobile-user-email');
    
    if (mobileAuthBtns) mobileAuthBtns.style.display = 'none';
    if (mobileUserMenu) mobileUserMenu.style.display = 'block';
    if (mobileUserEmail) mobileUserEmail.textContent = user.email;
}

function logout() {
    localStorage.removeItem('currentUser');
    location.reload();
}

// Login Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const errorDiv = document.getElementById('login-error');
            
            // Get all users from localStorage
            const users = JSON.parse(localStorage.getItem('apexUsers') || '[]');
            const user = users.find(u => u.email === email);
            
            if (!user) {
                errorDiv.textContent = 'Email not found. Please sign up.';
                return;
            }
            
            if (user.password !== password) {
                errorDiv.textContent = 'Incorrect password.';
                return;
            }
            
            // Login successful
            localStorage.setItem('currentUser', JSON.stringify({
                name: user.name,
                email: user.email
            }));
            
            closeLoginModal();
            document.getElementById('login-form').reset();
            updateAuthUI({name: user.name, email: user.email});
            
            // Show success message
            alert('Welcome back, ' + user.name + '!');
        });
    }
});

// Signup Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm').value;
            const errorDiv = document.getElementById('signup-error');
            
            // Validation
            if (password !== confirmPassword) {
                errorDiv.textContent = 'Passwords do not match.';
                return;
            }
            
            if (password.length < 6) {
                errorDiv.textContent = 'Password must be at least 6 characters.';
                return;
            }
            
            // Get all users from localStorage
            let users = JSON.parse(localStorage.getItem('apexUsers') || '[]');
            
            // Check if email already exists
            if (users.find(u => u.email === email)) {
                errorDiv.textContent = 'Email already registered. Please login.';
                return;
            }
            
            // Add new user
            users.push({
                name: name,
                email: email,
                password: password
            });
            
            localStorage.setItem('apexUsers', JSON.stringify(users));
            
            // Auto-login after signup
            localStorage.setItem('currentUser', JSON.stringify({
                name: name,
                email: email
            }));
            
            closeSignupModal();
            document.getElementById('signup-form').reset();
            updateAuthUI({name: name, email: email});
            
            // Show success message
            alert('Account created successfully! Welcome ' + name + '!');
        });
    }
});

// Close modals when clicking outside
window.addEventListener('click', function(e) {
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    
    if (e.target === loginModal) {
        closeLoginModal();
    }
    if (e.target === signupModal) {
        closeSignupModal();
    }
});

// ========== PAYMENT METHODS FUNCTIONS ==========

function openPaymentModal() {
    document.getElementById('payment-modal').style.display = 'block';
    document.getElementById('payment-error').textContent = '';
    document.getElementById('payment-form').reset();
    document.getElementById('payment-form').style.display = 'none';
    // Reset the button
    const btn = document.getElementById('payment-add-new-card-btn');
    if (btn) {
        btn.textContent = '+ Add New Card';
        btn.classList.remove('active');
    }
    displaySavedCards();
    updatePaymentLabels();
}

function closePaymentModal() {
    document.getElementById('payment-modal').style.display = 'none';
}

function maskCardNumber(cardNumber) {
    // Remove spaces and keep only digits
    const cleanNumber = cardNumber.replace(/\s+/g, '');
    if (cleanNumber.length < 4) return cleanNumber;
    // Show only last 4 digits
    const lastFour = cleanNumber.slice(-4);
    return `**** **** **** ${lastFour}`;
}

function formatCardNumber(input) {
    // Format card number with spaces every 4 digits
    let value = input.value.replace(/\s+/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    input.value = formattedValue;
}

function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    input.value = value;
}

function getLastFourDigits(cardNumber) {
    return cardNumber.replace(/\s+/g, '').slice(-4);
}

function displaySavedCards() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    const allPayments = JSON.parse(localStorage.getItem('apexPayments') || '{}');
    const userPayments = allPayments[currentUser.email] || [];

    const container = document.getElementById('saved-cards-container');
    
    if (userPayments.length === 0) {
        container.innerHTML = '<p style="color: #999; text-align: center;">No saved cards</p>';
        return;
    }

    container.innerHTML = '<h3>Saved Cards</h3>';
    userPayments.forEach((payment, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'saved-card';
        const lastFour = getLastFourDigits(payment.number);
        cardDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #f5f5f5; border-radius: 5px; margin-bottom: 0.5rem;">
                <div>
                    <strong>${payment.type}</strong><br>
                    <span style="color: #666;">Card ending in ${lastFour}</span><br>
                    <small style="color: #999;">Expires: ${payment.expiry}</small>
                </div>
                <button class="btn btn-logout" onclick="removeCard(${index})" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">Remove</button>
            </div>
        `;
        container.appendChild(cardDiv);
    });
}

function removeCard(index) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    const allPayments = JSON.parse(localStorage.getItem('apexPayments') || '{}');
    if (allPayments[currentUser.email]) {
        allPayments[currentUser.email].splice(index, 1);
        localStorage.setItem('apexPayments', JSON.stringify(allPayments));
        alert(translations[currentLanguage].card_removed);
        displaySavedCards();
    }
}

function updatePaymentLabels() {
    const t = translations[currentLanguage];
    document.getElementById('payment-title').textContent = t.manage_payment;
    
    const form = document.getElementById('payment-form');
    if (form) {
        // Update form labels
        const labels = form.querySelectorAll('label, h3');
        labels.forEach(label => {
            if (label.tagName === 'H3') {
                label.textContent = t.add_payment_method;
            }
        });
    }
}

// Payment Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        // Format card number input
        const cardInput = document.getElementById('payment-number');
        if (cardInput) {
            cardInput.addEventListener('input', function() {
                formatCardNumber(this);
            });
        }

        // Format expiry input
        const expiryInput = document.getElementById('payment-expiry');
        if (expiryInput) {
            expiryInput.addEventListener('input', function() {
                formatExpiryDate(this);
            });
        }

        // Handle form submission
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser) {
                alert('Please log in first');
                return;
            }

            const cardType = document.getElementById('payment-type').value;
            const cardNumber = document.getElementById('payment-number').value;
            const expiry = document.getElementById('payment-expiry').value;
            const cvv = document.getElementById('payment-cvv').value;
            const errorDiv = document.getElementById('payment-error');

            // Validation
            if (!cardType || !cardNumber || !expiry || !cvv) {
                errorDiv.textContent = 'Please fill in all fields';
                return;
            }

            if (cardNumber.replace(/\s+/g, '').length < 13) {
                errorDiv.textContent = 'Invalid card number';
                return;
            }

            if (!expiry.match(/^\d{2}\/\d{2}$/)) {
                errorDiv.textContent = 'Invalid expiry date (use MM/YY)';
                return;
            }

            if (cvv.length < 3) {
                errorDiv.textContent = 'Invalid CVV';
                return;
            }

            // Save payment method
            let allPayments = JSON.parse(localStorage.getItem('apexPayments') || '{}');
            if (!allPayments[currentUser.email]) {
                allPayments[currentUser.email] = [];
            }

            allPayments[currentUser.email].push({
                type: cardType,
                number: cardNumber,
                expiry: expiry,
                cvv: cvv
            });

            localStorage.setItem('apexPayments', JSON.stringify(allPayments));
            errorDiv.textContent = '';
            alert(translations[currentLanguage].card_saved);
            paymentForm.reset();
            displaySavedCards();
            // Hide the form after adding a card
            paymentForm.style.display = 'none';
            const btn = document.getElementById('payment-add-new-card-btn');
            if (btn) {
                btn.textContent = '+ Add New Card';
                btn.classList.remove('active');
            }
        });
    }
    
    // Handle "Add New Card" button in payment modal
    const paymentAddBtn = document.getElementById('payment-add-new-card-btn');
    if (paymentAddBtn) {
        paymentAddBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const form = document.getElementById('payment-form');
            const isHidden = form.style.display === 'none';
            
            if (isHidden) {
                form.style.display = 'block';
                paymentAddBtn.textContent = '- Hide Card Details';
                paymentAddBtn.classList.add('active');
            } else {
                form.style.display = 'none';
                paymentAddBtn.textContent = '+ Add New Card';
                paymentAddBtn.classList.remove('active');
                // Clear the form when hiding
                form.reset();
                document.getElementById('payment-error').textContent = '';
            }
        });
    }
});

// Close payment modal when clicking outside
window.addEventListener('click', function(e) {
    const paymentModal = document.getElementById('payment-modal');
    if (e.target === paymentModal) {
        closePaymentModal();
    }
});
