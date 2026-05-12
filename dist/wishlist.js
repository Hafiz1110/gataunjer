let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let notificationTimeout = null;

function showNotification(message, type = 'info', actions = []) {
    const notification = document.getElementById('notification');
    if (!notification) return;

    const typeClasses = type === 'success'
        ? 'bg-emerald-700 border-emerald-500 text-white'
        : type === 'error'
            ? 'bg-red-700 border-red-500 text-white'
            : 'bg-slate-900 border-slate-700 text-white';

    const messageHtml = message.replace(/\n/g, '<br>');
    const actionHtml = actions.map(action => `
            <button type="button" onclick="${action.onClick}" class="rounded px-3 py-2 text-sm font-semibold ${action.class || 'bg-slate-700 hover:bg-slate-600 text-white'}">${action.label}</button>
        `).join('');

    notification.innerHTML = `
        <div class="border ${typeClasses} p-4 rounded-xl">
            <div class="text-sm leading-6">${messageHtml}</div>
            ${actions.length ? `<div class="notification-actions">${actionHtml}</div>` : ''}
        </div>
    `;
    notification.style.display = 'block';

    if (notificationTimeout) {
        clearTimeout(notificationTimeout);
        notificationTimeout = null;
    }

    if (!actions.length) {
        notificationTimeout = setTimeout(() => {
            notification.style.display = 'none';
        }, 4000);
    }
}

function hideNotification() {
    const notification = document.getElementById('notification');
    if (!notification) return;
    notification.style.display = 'none';
    if (notificationTimeout) {
        clearTimeout(notificationTimeout);
        notificationTimeout = null;
    }
}

function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (product && !wishlist.find(p => p.id === productId)) {
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        showNotification(`${product.title} added to wishlist!`, 'success');
    } else if (wishlist.find(p => p.id === productId)) {
        showNotification('Product already in wishlist!', 'error');
    }
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(p => p.id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    loadWishlistDisplay();
}

function getWishlist() {
    return wishlist;
}

function loadWishlistDisplay() {
    const container = document.getElementById('wishlist-items');
    const modalContainer = document.getElementById('wishlistModalContent');
    const totalDiv = document.getElementById('wishlistTotal');
    
    let html = '';
    let total = 0;
    
    if (wishlist.length === 0) {
        html = '<p class="text-white text-center col-span-3">Your wishlist is empty</p>';
        if (totalDiv) totalDiv.innerHTML = '';
    } else {
        wishlist.forEach(product => {
            total += product.price;
            html += `
            <div class="bg-gray-800 p-4 rounded-lg shadow-md border border-blue-500">
                <p><img src="${product.image}" alt="${product.title}" width="80px" class="mx-auto"></p>
                <p class="text-lg font-bold text-blue-400 mt-2">${product.category}</p>
                <p class="text-sm font-semibold text-white mt-1">${product.title}</p>
                <p class="text-xl font-bold text-green-400 mt-2">$${product.price.toFixed(2)}</p>
                <div class="mt-4 flex space-x-2">
                    <button onclick="removeFromWishlist(${product.id})" class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition-colors flex-1 text-sm">Remove</button>
                </div>
            </div>
            `;
        });
        if (totalDiv) totalDiv.innerHTML = `Total Wishlist Value: $${total.toFixed(2)}`;
    }
    
    if (modalContainer) modalContainer.innerHTML = html;
    if (container) container.innerHTML = html;

    const checkoutBtn = document.getElementById('wishlistCheckoutBtn');
    if (checkoutBtn) checkoutBtn.disabled = wishlist.length === 0;
}

function checkoutWishlist() {
    if (wishlist.length === 0) {
        showNotification('Your wishlist is empty. Add items before checking out.', 'error');
        return;
    }

    const total = wishlist.reduce((sum, product) => sum + product.price, 0).toFixed(2);
    const itemList = wishlist.map(product => `${product.title} - $${product.price.toFixed(2)}`).join('\n');

    showNotification(`Checkout the following wishlist items?\n\n${itemList}\n\nTotal: $${total}`, 'info', [
        { label: 'Confirm checkout', onClick: 'confirmWishlistCheckout()', class: 'bg-emerald-600 hover:bg-emerald-700 text-white' },
        { label: 'Cancel', onClick: 'hideNotification()', class: 'bg-slate-700 hover:bg-slate-600 text-white' }
    ]);
}

function confirmWishlistCheckout() {
    const total = wishlist.reduce((sum, product) => sum + product.price, 0).toFixed(2);
    wishlist = [];
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    loadWishlistDisplay();
    closeWishlistModal();
    hideNotification();
    showNotification(`Checkout complete! Total charged: $${total}`, 'success');
}

function openWishlistModal() {
    loadWishlistDisplay();
    document.getElementById('wishlistModal').classList.remove('hidden');
}

function closeWishlistModal() {
    document.getElementById('wishlistModal').classList.add('hidden');
}