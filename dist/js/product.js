let products = [];

async function fetchProducts() {
  try {
    let response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) throw new Error("Gagal memuat data produk");
    products = await response.json();
    loadProduct();
  } catch (error) {
    console.error("ERROR saat memuat data produk:", error);
  }
}

function loadProduct() {
  let container = document.getElementById("products");
  let hasil = "";
  products.forEach((product) => {
    hasil += `
    <div class="product bg-gray-900 p-4 rounded-lg shadow-md m-10 hover:scale-105 transition-transform duration-300 border border-blue-500">
      <p><img src="${product.image}" alt="${product.title}" width="100px"></p>
      <p class="text-lg font-bold text-blue-400">${product.category}</p>
      <p class="text-xl font-semibold text-white">${product.title}</p>
      <p class="text-2xl font-bold text-green-400 mt-2">$${product.price.toFixed(2)}</p>
      <div class="mt-4 flex items-center space-x-2">
        <input type="number" id="qty-${product.id}" min="1" max="10" value="1" class="bg-gray-800 text-white border border-blue-500 rounded px-2 py-2 w-16 text-center">
        <button onclick="buyProduct(${product.id})" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors flex-1">Buy Now</button>
        <button onclick="addToWishlist(${product.id})" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors flex-1">Add to Wishlist</button>
      </div>
    </div>
    `;
  });
  container.innerHTML = hasil;
}

fetchProducts();