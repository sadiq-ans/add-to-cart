let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.getElementById("cart-products");
const priceTotal = document.getElementById("priceTotal");
const cartCount = document.getElementById("cart-count");

function updateCartCount() {
  if (!cartCount) return;
  cartCount.innerText = cart.reduce((sum, i) => sum + i.quantity, 0);
}

function removeProduct(index) {
  cart.splice(index, 1);
  saveAndRender();
}

function clearCart() {
  cart = [];
  saveAndRender();
}

function updateQty(index, value) {
  cart[index].quantity += value;
  if (cart[index].quantity <= 0) {
    removeProduct(index);
    return;
  }
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

function displayCart() {
  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = `<h3 class="text-center py-5">Cart is empty</h3>`;
    priceTotal.innerText = "$0";
    updateCartCount();
    return;
  }

  cart.forEach((item, idx) => {
    const sub = item.price * item.quantity;
    total += sub;

    cartContainer.innerHTML += `
      <div class="row align-items-center border-bottom py-3">
        <div class="col-2"><img src="${item.image}" class="img-fluid"></div>
        <div class="col-3"><h5>${item.name}</h5></div>
        <div class="col-1">$${item.price}</div>
        <div class="col-3 d-flex gap-2 align-items-center">
          <button class="btn btn-sm btn-cart" onclick="updateQty(${idx}, -1)">-</button>
          <strong class="p-3">${item.quantity}</strong>
          <button class="btn btn-sm btn-cart" onclick="updateQty(${idx}, 1)">+</button>
        </div>
        <div class="col-2"><strong>$${sub}</strong></div>
        <div class="col-1">
          <button class="btn btn-sm px-3 btn-danger" onclick="removeProduct(${idx})">x</button>
        </div>
      </div>
    `;
  });

  priceTotal.innerText = `$${total}`;
  updateCartCount();
}

function sortCart() {
  cart.sort((a, b) => b.price - a.price);
  saveAndRender();
}

document.addEventListener("DOMContentLoaded", displayCart);
