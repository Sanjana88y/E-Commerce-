const products = [
  {
    id: 1,
    name: "Classic Sneakers",
    category: "Men",
    price: 999,
    size: "8, 9, 10",
    rating: 4.6,
    img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnN8ZW58MHx8MHx8fDA%3D",
    description: "Comfortable daily wear sneakers with a sleek look and breathable material. Perfect for walking, commuting, or casual outings."
  },
  {
    id: 2,
    name: "Summer Shirt",
    category: "Women",
    price: 599,
    size: "S, M, L",
    rating: 4.2,
    img: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VtbWVyJTIwc2hpcnR8ZW58MHx8MHx8fDA%3D",
    description: "Lightweight printed shirt designed for warm days. Stylish, soft, and easy to pair with jeans or shorts."
  },
  {
    id: 3,
    name: "Designer Watch",
    category: "Accessories",
    price: 2799,
    size: "One Size",
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0Y2h8ZW58MHx8MHx8fDA%3D",
    description: "Minimalist watch with a stainless steel case and leather strap. A premium accessory for both office and evening wear."
  },
  {
    id: 4,
    name: "Travel Backpack",
    category: "Women",
    price: 999,
    size: "Large",
    rating: 4.4,
    img: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsJTIwYmFja3BhY2t8ZW58MHx8MHx8fDA%3D",
    description: "Spacious backpack with multiple compartments, water-resistant fabric, and comfortable straps for travel and everyday carry."
  },
  {
    id: 5,
    name: "Formal Jacket",
    category: "Men",
    price: 1699,
    size: "M, L, XL",
    rating: 4.5,
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFja2V0fGVufDB8fDB8fHww",
    description: "Smart formal jacket with a modern cut, ideal for business meetings and elegant evening events."
  },
  {
    id: 6,
    name: "Wireless Earbuds",
    category: "Accessories",
    price: 1399,
    size: "One Size",
    rating: 4.3,
    img: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww",
    description: "Noise-isolating wireless earbuds with crystal-clear sound and long battery life for everyday listening."
  }
];

let cartCount = 0;
let selectedProduct = null;
let currentCategory = "All";

function displayProducts(category = currentCategory) {
  currentCategory = category;
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  const filteredProducts = category === "All"
    ? products
    : products.filter(product => product.category === category);

  const heading = document.getElementById("collectionHeading");
  heading.innerText = category === "All" ? "Our Collection" : `${category} Collection`;

  if (filteredProducts.length === 0) {
    productList.innerHTML = `<p class="no-products">No products found in ${category}.</p>`;
    return;
  }

  filteredProducts.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.addEventListener("click", () => openProductDetail(product.id));

    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <div class="card-content">
        <h3 class="card-title">${product.name}</h3>
        <p class="card-price">₹${product.price}</p>
        <div class="card-meta">
          <span class="card-size">Size: ${product.size}</span>
          <span class="card-rating">${product.rating} ★</span>
        </div>
        <p class="card-description">${product.description}</p>
        <button type="button" class="card-button">View Product</button>
      </div>
    `;

    productList.appendChild(card);
  });
}

function setCategoryFilter(category) {
  currentCategory = category;
  document.querySelectorAll(".filter-btn").forEach(button => {
    button.classList.toggle("active", button.dataset.category === category);
  });
  displayProducts(category);
}

function openProductDetail(productId) {
  selectedProduct = products.find(item => item.id === productId);
  if (!selectedProduct) return;

  document.getElementById("detailImage").src = selectedProduct.img;
  document.getElementById("detailImage").alt = selectedProduct.name;
  document.getElementById("detailName").innerText = selectedProduct.name;
  document.getElementById("detailPrice").innerText = `₹${selectedProduct.price}`;
  document.getElementById("detailSize").innerText = `Size: ${selectedProduct.size}`;
  document.getElementById("detailRating").innerText = `Rating: ${selectedProduct.rating} / 5`;
  document.getElementById("detailDescription").innerText = selectedProduct.description;

  document.getElementById("productDetailView").classList.remove("hidden");
  document.getElementById("productDetailView").setAttribute("aria-hidden", "false");
  document.querySelector(".featured-products").classList.add("hidden");
  document.querySelector(".hero").classList.add("hidden");
}

function closeProductDetail() {
  selectedProduct = null;
  document.getElementById("productDetailView").classList.add("hidden");
  document.getElementById("productDetailView").setAttribute("aria-hidden", "true");
  document.querySelector(".featured-products").classList.remove("hidden");
  document.querySelector(".hero").classList.remove("hidden");
}

const cartItems = [];

function updateCartCount() {
  document.getElementById("cartCount").innerText = cartCount;
}

function updateCartList() {
  const cartList = document.getElementById("cartItemList");
  cartList.innerHTML = "";
  let total = 0;

  if (cartItems.length === 0) {
    cartList.innerHTML = "<p class='empty-cart'>Aapka cart abhi khali hai.</p>";
  } else {
    cartItems.forEach(item => {
      const itemCard = document.createElement("div");
      itemCard.className = "cart-item";
      itemCard.innerHTML = `
        <div>
          <strong>${item.name}</strong>
          <p>₹${item.price} x ${item.quantity}</p>
        </div>
        <div class="cart-item-actions">
          <div>₹${item.price * item.quantity}</div>
          <button type="button" class="cart-remove-btn" data-id="${item.id}">Remove</button>
        </div>
      `;
      cartList.appendChild(itemCard);
      total += item.price * item.quantity;
    });

    cartList.querySelectorAll(".cart-remove-btn").forEach(button => {
      button.addEventListener("click", event => {
        const itemId = Number(event.target.dataset.id);
        removeCartItem(itemId);
      });
    });
  }

  document.getElementById("cartTotal").innerText = `₹${total}`;
  document.getElementById("cartItemCount").innerText = cartCount;
}

function addToCartItem(product) {
  cartCount += 1;
  const existing = cartItems.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }

  updateCartCount();
  updateCartList();
}

function removeCartItem(itemId) {
  const itemIndex = cartItems.findIndex(item => item.id === itemId);
  if (itemIndex === -1) return;

  const item = cartItems[itemIndex];
  cartCount -= 1;

  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cartItems.splice(itemIndex, 1);
  }

  updateCartCount();
  updateCartList();
}

function checkoutCart() {
  if (cartItems.length === 0) return;
  cartItems.length = 0;
  cartCount = 0;
  updateCartCount();
  updateCartList();
  closeCart();
  alert("Checkout successful!\nAapka order receive kiya gaya hai.");
}

function openCart() {
  updateCartList();
  document.getElementById("cartModal").classList.add("open");
  document.getElementById("cartModal").setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function closeCart() {
  document.getElementById("cartModal").classList.remove("open");
  document.getElementById("cartModal").setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

function setupEvents() {
  document.getElementById("backButton").addEventListener("click", closeProductDetail);
  document.getElementById("detailAddCart").addEventListener("click", () => {
    if (!selectedProduct) return;
    addToCartItem(selectedProduct);
    closeProductDetail();
  });
  document.getElementById("cartButton").addEventListener("click", openCart);
  document.getElementById("closeCart").addEventListener("click", closeCart);
  document.getElementById("checkoutButton").addEventListener("click", checkoutCart);
  document.getElementById("cartModal").addEventListener("click", event => {
    if (event.target.id === "cartModal") {
      closeCart();
    }
  });
  document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => setCategoryFilter(button.dataset.category));
  });
  document.getElementById("heroShopButton").addEventListener("click", () => {
    document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
  });
}

updateCartCount();
setupEvents();
displayProducts();