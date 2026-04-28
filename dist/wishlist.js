let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (product && !wishlist.find(p => p.id === productId)) {
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert(`${product.title} added to wishlist!`);
    } else if (wishlist.find(p => p.id === productId)) {
        alert('Product already in wishlist!');
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
}

function openWishlistModal() {
    loadWishlistDisplay();
    document.getElementById('wishlistModal').classList.remove('hidden');
}

function closeWishlistModal() {
    document.getElementById('wishlistModal').classList.add('hidden');
}