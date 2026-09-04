// Cart stored in the browser (localStorage). Each item is keyed by product id + size.
function getCart() {
  return JSON.parse(localStorage.getItem("velora_cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("velora_cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId, size, qty) {
  qty = qty || 1;
  const cart = getCart();
  const existing = cart.find((item) => item.id === productId && item.size === size);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, size: size, qty: qty });
  }
  saveCart(cart);
  alert("Added to cart!");
}

function removeFromCart(productId, size) {
  let cart = getCart();
  cart = cart.filter((item) => !(item.id === productId && item.size === size));
  saveCart(cart);
  if (typeof renderCartPage === "function") renderCartPage();
}

function updateQty(productId, size, qty) {
  const cart = getCart();
  const item = cart.find((i) => i.id === productId && i.size === size);
  if (item) {
    item.qty = Math.max(1, qty);
    saveCart(cart);
  }
  if (typeof renderCartPage === "function") renderCartPage();
}

function cartTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => {
    const product = typeof getProductById === "function" ? getProductById(item.id) : null;
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
}

function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (!el) return;
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  el.textContent = count;
}

document.addEventListener("DOMContentLoaded", updateCartCount);
