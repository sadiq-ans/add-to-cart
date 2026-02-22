const products = [
    { id: 1, name: "Travel Bag", image: "./assets/images/office-bag.jpg", price: 65, category: "men", rating: 4.2, reviews: 900 },
    { id: 2, name: "Minimalist Gather", image: "./assets/images/minimalist-gather.jpg", price: 48, category: "women", rating: 4.9, reviews: 680 },
    { id: 3, name: "Stride Sling", image: "./assets/images/stride-sling.jpg", price: 35, category: "men", rating: 4.4, reviews: 601 },
    { id: 4, name: "Gentle Touch", image: "./assets/images/gentle-touch.jpg", price: 80, category: "women", rating: 4.1, reviews: 562 },
    { id: 5, name: "Crystal Path", image: "./assets/images/crystal-path.jpg", price: 70, category: "women", rating: 4.6, reviews: 450 },
    { id: 6, name: "Bold Spirit", image: "./assets/images/bold-spirit.jpg", price: 40, category: "women", rating: 4.5, reviews: 400 },
    { id: 7, name: "Womens Evening Clutch", image: "./assets/images/womens-evening-clutch.jpg", price: 46, category: "accessories", rating: 4.4, reviews: 302 },
    { id: 8, name: "Office Bag", image: "./assets/images/office-bag02.jpg", price: 55, category: "men", rating: 3.5, reviews: 205 },
    { id: 9, name: "Taddy Brown Key", image: "./assets/images/taddy-bag-hooked.jpg", price: 28, category: "accessories", rating: 4.1, reviews: 101 }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
    const badge = document.getElementById("cart-count");
    if (!badge) return;

    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.innerText = count;
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(i => i.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    Swal.fire({
        icon: "success",
        title: "Added to Cart",
        text: `${product.name} added successfully`,
        timer: 1200,
        showConfirmButton: false
    });
}

function renderProducts(list) {
    const productRow = document.getElementById("productRow");
    if (!productRow) return;

    productRow.innerHTML = "";
    list.forEach(p => {
        productRow.innerHTML += `
      <div class="col-12 col-md-4">
        <div class="card">
          <img src="${p.image}" class="card-img-top">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center gap-1">
            <h5>${p.name}</h5>
            <h4>$${p.price}</h4>
            </div>
            <small class="text-muted">${p.rating} (${p.reviews} reviews)</small>
            <div class="btn-group w-100 mt-3">
            <button class="btn btn-cart text-uppercase d-flex justify-content-center align-items-center" onclick="addToCart(${p.id})">
              Add to Cart <i class="bx bx-plus px-2"></i>
            </button>
            <button class="btn btn-buy text-uppercase">
              Buy Now <i class="bi bi-cart ms-2"></i>
            </button>
            </div>
          </div>
        </div>
      </div>
    `;
    });
}

function filterProducts(category) {
    category === "all"
        ? renderProducts(products)
        : renderProducts(products.filter(p => p.category === category));
}

document.addEventListener("DOMContentLoaded", () => {
    renderProducts(products);
    updateCartCount();
});
