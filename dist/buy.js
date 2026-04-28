let currentBuyData = null;

function buyProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const quantity = parseInt(document.getElementById(`qty-${productId}`).value) || 1;
        const total = (product.price * quantity).toFixed(2);
        
        currentBuyData = {
            product: product,
            quantity: quantity,
            total: total
        };
        
        const modal = document.getElementById('buyModal');
        const content = document.getElementById('buyModalContent');
        
        content.innerHTML = `
            <img src="${product.image}" alt="${product.title}" width="150" class="mx-auto mb-4">
            <p class="text-lg font-bold text-blue-400 mb-2">${product.category}</p>
            <p class="text-xl font-semibold mb-4">${product.title}</p>
            <div class="border-t border-gray-700 pt-4">
                <div class="flex justify-between mb-2">
                    <span>Price per item:</span>
                    <span class="text-green-400">$${product.price.toFixed(2)}</span>
                </div>
                <div class="flex justify-between mb-2">
                    <span>Quantity:</span>
                    <span class="text-green-400">${quantity}</span>
                </div>
                <div class="flex justify-between text-lg font-bold border-t border-gray-700 pt-2 mt-2">
                    <span>Total:</span>
                    <span class="text-green-400">$${total}</span>
                </div>
            </div>
        `;
        
        modal.classList.remove('hidden');
    }
}

function confirmBuy() {
    if (currentBuyData) {
        alert(`✓ Purchase confirmed!\n${currentBuyData.product.title}\nQuantity: ${currentBuyData.quantity}\nTotal: $${currentBuyData.total}`);
        closeBuyModal();
        currentBuyData = null;
    }
}

function closeBuyModal() {
    document.getElementById('buyModal').classList.add('hidden');
    currentBuyData = null;
}