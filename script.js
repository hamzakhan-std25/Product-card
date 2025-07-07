let products = [];
let filteredProducts = [];
let visibleCount = 6;
// let cart = [];
const themeBtn = document.getElementById('toggle-theme');
const cartCount = document.getElementById('cart-count');


const container = document.getElementById('product-container');
const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category');
const loadMoreBtn = document.getElementById('load-more');


let cart = JSON.parse(localStorage.getItem('cart')) || [];

// const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const closeCartBtn = document.getElementById('close-cart');
const cartInfo = document.querySelector('.cart-info');


//   show cart model on click 
cartInfo.addEventListener('click', () => {
  renderCart();
  cartModal.classList.add('show');
});

closeCartBtn.addEventListener('click', () => {
  cartModal.classList.remove('show');
});



// add to card function..
function addToCart(product) {
  const existing = cart.find(p => p.id === product.id);
  if (!existing) {
    cart.push({...product, quantity: 1});
  } else {
    existing.quantity++;
  }
  saveCart();
  updateCartUI();
}

// remove from card function
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
  updateCartUI();
}

//  Save + Render + Count

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function renderCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "0.00";
    return;
  }

  cart.forEach(item => {
    const li = document.createElement('li');
    console.log(item)
    li.innerHTML = `
      ${item.name} (x${item.quantity}) - $${(item.price*item.quantity).toFixed(2)}

      <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartItemsContainer.appendChild(li);
    total += item.price*item.quantity;
  });

  cartTotal.textContent = total.toFixed(2);
}



themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    themeBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
});


fetch('data.json')
    .then(res => res.json())
    .then(data => {
        products = data;
        renderCategories();
        applyFilters();
    });

function renderCategories() {
    const categories = [ ...new Set(products.map(p => p.category))];
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        categorySelect.appendChild(option);
    });
}

function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value;

    filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm) || p.description.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        // console.log("filtered products is : match:", matchesSearch,"categroy:",matchesCategory)
        return matchesSearch && matchesCategory;
    });

    visibleCount = 5; // Reset count
    renderProducts();
    // toggleLoadMore();
}

function renderProducts() {
    container.innerHTML = '';
    const currentItems = filteredProducts.slice(0, visibleCount);

    currentItems.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-img" />
      <h2 class="product-title">${product.name}</h2>
      <p class="product-description">${product.description}</p>
      <div class="product-price">$${product.price.toFixed(2)}</div>
      <div class="product-rating">⭐ ${product.rating}</div>
      <button class="buy-btn" data-id="${product.id}">Add to Cart</button>

    `;
        container.appendChild(card);

    });

    if (currentItems.length === 0) {
        container.innerHTML = "<p>No products found.</p>";
    }


    //  Add event listeners to all buttons after rendering

    document.querySelectorAll('.buy-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            if (product) {
                addToCart(product);
            }
        });
    });



    toggleLoadMore();
}

function toggleLoadMore() {
    if (visibleCount >= filteredProducts.length) {
        loadMoreBtn.style.display = "none";
    } else {
        loadMoreBtn.style.display = "inline-block";
    }
}

loadMoreBtn.addEventListener('click', () => {
    visibleCount += 6;
    renderProducts();
});




// Filters
searchInput.addEventListener('input', applyFilters);
categorySelect.addEventListener('change', applyFilters);


updateCartUI();
