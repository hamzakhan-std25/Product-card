# 🛍️ Product Card Web Page

A responsive product listing page with filtering, search, animated UI, dark mode, and a working shopping cart (stored in localStorage). Built using **HTML, CSS, and JavaScript** — no frameworks required!

---

## 🚀 Features

- 🔍 **Live Search** to filter products by name or description
- 📂 **Category Filter** (auto-generated from product list)
- 🌈 **Animated Gradient Borders** on inputs and selects
- 🌙 **Dark Mode Toggle** (with smooth transition)
- 🛒 **Shopping Cart**
  - Add items to cart
  - View cart in modal
  - Remove items from cart
  - Save cart in `localStorage` (persists on reload)
- ➕ **Load More** button to display products in batches
- 📱 Fully responsive layout with modern UI

---

## 📁 Folder Structure

product-cards/
│
├── index.html # Main HTML page
├── style.css # All styles (theme, layout, modal, animations)
├── script.js # Core logic for filtering, cart, dark mode, etc.
├── data.json # Product data (name, description, image, etc.)


---

## 📸 Preview

![Product Cards Screenshot](preview.png) <!-- Optional: Add your own screenshot and name it preview.png -->

---

## 🧠 Technologies Used

- HTML5
- CSS3 (with CSS variables, animations)
- Vanilla JavaScript (DOM manipulation, localStorage)
- JSON (for product data)

---

## 🔧 How to Use

1. Clone this repo:
   ```bash
   git clone https://github.com/your-username/product-cards.git
   cd product-cards
2.  
   Open index.html in your browser.

⚠️ No build tools or server required. Just open in browser.

-----




🌐 Live Demo
🔗 View Live on GitHub Pages



----



📦 Future Improvements
Add product quantity handling

Save theme preference to localStorage

Add checkout or order summary page

Integrate real API (e.g., Firebase, FakeStoreAPI)