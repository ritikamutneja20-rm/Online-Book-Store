# 📚 Online Book Store

> **A thoughtfully designed frontend e-commerce experience for discovering, saving, and shopping for books.**

Online Book Store is a responsive web application that transforms a simple bookstore concept into a complete digital shopping experience.

From discovering books and exploring their details to managing a wishlist, building a cart, completing checkout, and receiving an order confirmation — the application brings the complete customer journey together using **HTML, CSS, and JavaScript**.

---

## ✨ Experience the Store

The application is designed around a simple idea:

**Discover → Explore → Save → Cart → Checkout → Order**

Every part of the interface is connected to make the experience feel like a real-world online bookstore rather than a collection of static web pages.

---

## 🌟 What Makes This Project Special

### 🔎 Discover Books

Explore a curated catalogue of books through:

- Book search
- Category-based filtering
- Book ratings
- Dedicated book detail pages
- Clean, responsive book cards

### 📖 Explore Before You Buy

Every book has its own detail experience where users can view:

- Book title
- Category
- Rating
- Price
- Add to Cart option
- Add to Wishlist option

### ❤️ Personal Wishlist

Found something interesting but not ready to buy?

Save it to the wishlist and come back whenever you want.

Users can:

- Add books to wishlist
- Remove saved books
- View wishlist count
- Move books directly to the cart

### 🛒 Smart Shopping Cart

The cart dynamically manages the user's selected books.

It supports:

- Adding books
- Increasing quantity
- Decreasing quantity
- Removing individual items
- Clearing the cart
- Automatic item count
- Automatic subtotal calculation
- Automatic final total

### 🔐 User Experience

The application includes a simple authentication flow with:

- Account registration
- Form validation
- Login
- Personalized greeting
- Logout

User information is handled locally for this frontend implementation.

### 💳 Checkout Experience

The shopping journey continues through a dedicated checkout page with:

- Customer information
- Delivery address
- City
- PIN code validation
- Payment method selection
- Order summary
- Final order amount

### 🎉 Order Confirmation

After successfully placing an order, users receive a dedicated confirmation experience containing:

- Generated Order ID
- Order date
- Total amount
- Delivery message
- Continue Shopping option
- Return to Home option

### 🌙 Personalised Interface

A built-in dark mode allows users to switch between light and dark themes.

The selected theme is remembered using browser storage.

### 📱 Responsive by Design

The interface adapts to different screen sizes so that the experience remains usable across:

- 💻 Desktop
- 📱 Mobile
- 📟 Tablet-sized screens

---

# 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Page structure and semantic content |
| **CSS3** | Layout, styling, animations and responsive design |
| **JavaScript** | Application logic and interactivity |
| **LocalStorage** | Client-side persistence |

---

# 🧩 Application Architecture

```text
                    ┌─────────────────┐
                    │   Home Page     │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Book Catalogue  │
                    └────────┬────────┘
                             │
                  ┌──────────┴──────────┐
                  ▼                     ▼
           Search / Filter         Book Details
                                        │
                              ┌─────────┴─────────┐
                              ▼                   ▼
                         ❤️ Wishlist          🛒 Cart
                              │                   │
                              └─────────┬─────────┘
                                        ▼
                                💳 Checkout
                                        │
                                        ▼
                              🎉 Order Confirmation
```                              

## 📁 Project Structure
```
ONLINE BOOK STORE/
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── index.html
├── catalogue.html
├── book-details.html
├── wishlist.html
├── cart.html
├── checkout.html
├── order-success.html
├── login.html
├── register.html
│
└── README.md
```


## 💾 Client-Side Data Management

The application uses browser **LocalStorage** to maintain important client-side data and user preferences.
```
registeredUser
loggedIn
cart
wishlist
lastOrder
darkMode