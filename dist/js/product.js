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
    <div class="product bg-gray-900 p-3 sm:p-4 rounded-lg shadow-md mx-2 sm:mx-0 hover:scale-105 transition-transform duration-300 border border-blue-500">
      <p class="text-center"><img src="${product.image}" alt="${product.title}" width="80px" class="sm:w-24"></p>
      <p class="text-base sm:text-lg font-bold text-blue-400 mt-2 line-clamp-1">${product.category}</p>
      <p class="text-sm sm:text-base font-semibold text-white mt-1 line-clamp-2">${product.title}</p>
      <p class="text-lg sm:text-2xl font-bold text-green-400 mt-2">$${product.price.toFixed(2)}</p>
      <div class="mt-3 sm:mt-4 flex flex-col sm:flex-row items-center gap-2 sm:gap-2">
        <input type="number" id="qty-${product.id}" min="1" max="10" value="1" class="bg-gray-800 text-white border border-blue-500 rounded px-2 py-1 sm:py-2 w-14 sm:w-16 text-center text-sm sm:text-base">
        <button onclick="buyProduct(${product.id})" class="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-1 sm:py-2 rounded transition-colors flex-1 w-full sm:w-auto text-sm sm:text-base">Buy</button>
        <button onclick="addToWishlist(${product.id})" class="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-1 sm:py-2 rounded transition-colors flex-1 w-full sm:w-auto text-sm sm:text-base">Wish</button>
      </div>
    </div>
    `;
  });
  container.innerHTML = hasil;
}

fetchProducts();