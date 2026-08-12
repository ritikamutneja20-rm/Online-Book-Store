// =========================
// SEARCH BOOKS
// =========================

function searchBooks() {
    const searchInput = document.getElementById("searchInput");

    if (!searchInput) return;

    const searchText = searchInput.value.toLowerCase().trim();
    const categoryFilter = document.getElementById("categoryFilter");

    const selectedCategory = categoryFilter
        ? categoryFilter.value
        : "all";

    const books = document.querySelectorAll(".book-card");

    let found = 0;

    books.forEach(function (book) {

        const bookName =
            book.querySelector("h3").textContent.toLowerCase();

        const bookCategory =
            book.getAttribute("data-category");

        const matchesSearch =
            bookName.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            bookCategory === selectedCategory;

        if (matchesSearch && matchesCategory) {
            book.style.display = "block";
            found++;
        } else {
            book.style.display = "none";
        }
    });

    const noResults =
        document.getElementById("noResults");

    if (noResults) {
        noResults.style.display =
            found === 0 ? "block" : "none";
    }
}


// =========================
// CATEGORY FILTER
// =========================

function filterBooks() {

    searchBooks();
}


// =========================
// ADD TO CART
// =========================

function addToCart(name, price) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const existingBook =
        cart.find(function (book) {
            return book.name === name;
        });

    if (existingBook) {
        existingBook.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(name + " added to cart! 🛒");
}


// =========================
// CART COUNT
// =========================

function updateCartCount() {

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let totalItems = 0;

    cart.forEach(function (book) {
        totalItems += book.quantity;
    });

    const cartLinks =
        document.querySelectorAll('a[href="cart.html"]');

    cartLinks.forEach(function (link) {

        link.textContent =
            "Cart 🛒" +
            (totalItems > 0 ? " (" + totalItems + ")" : "");
    });
}


// =========================
// WISHLIST
// =========================

function getWishlist() {

    return JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];
}


function addToWishlist(name, price, category) {

    let wishlist = getWishlist();

    const exists =
        wishlist.some(function (book) {
            return book.name === name;
        });

    if (exists) {

        alert("This book is already in your wishlist ❤️");

        return;
    }

    wishlist.push({
        name: name,
        price: price,
        category: category
    });

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    updateWishlistCount();

    alert(name + " added to wishlist ❤️");
}


function removeFromWishlist(index) {

    let wishlist = getWishlist();

    wishlist.splice(index, 1);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    displayWishlist();
    updateWishlistCount();
}


function updateWishlistCount() {

    const wishlist = getWishlist();

    const links =
        document.querySelectorAll(
            'a[href="wishlist.html"]'
        );

    links.forEach(function (link) {

        link.textContent =
            "Wishlist ❤️" +
            (wishlist.length > 0
                ? " (" + wishlist.length + ")"
                : "");
    });
}


// =========================
// ADD EXTRA BUTTONS
// =========================

function addBookActions() {

    const cards =
        document.querySelectorAll(".book-card");

    cards.forEach(function (card) {

        if (card.querySelector(".extra-actions")) {
            return;
        }

        const name =
            card.querySelector("h3").textContent;

        const priceText =
            card.querySelector(".price").textContent;

        const price =
            Number(priceText.replace("₹", ""));

        const category =
            card.getAttribute("data-category");


        const actions =
            document.createElement("div");

        actions.className = "extra-actions";

        actions.innerHTML = `

            <button
                class="details-btn"
                onclick="openBookDetails('${name}', ${price}, '${category}')"
            >
                📖 Details
            </button>

            <button
                class="wishlist-btn"
                onclick="addToWishlist('${name}', ${price}, '${category}')"
            >
                ♡ Wishlist
            </button>

        `;

        card.querySelector(".book-info")
            .appendChild(actions);
    });
}


// =========================
// BOOK DETAILS
// =========================

function openBookDetails(name, price, category) {

    const url =
        "book-details.html?" +
        "name=" + encodeURIComponent(name) +
        "&price=" + price +
        "&category=" + encodeURIComponent(category);

    window.location.href = url;
}


// =========================
// DISPLAY CART
// =========================

function displayCart() {

    const cartItems =
        document.getElementById("cartItems");

    if (!cartItems) return;

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    cartItems.innerHTML = "";

    let total = 0;
    let itemCount = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h2>Your cart is empty</h2>

                <p>
                    You haven't added any books yet.
                </p>

                <a
                    href="catalogue.html"
                    class="continue-shopping"
                >
                    Browse Books
                </a>

            </div>
        `;

        updateCartSummary(0, 0);

        return;
    }


    cart.forEach(function (book, index) {

        const subtotal =
            book.price * book.quantity;

        total += subtotal;

        itemCount += book.quantity;


        const item =
            document.createElement("div");

        item.className = "cart-item";


        item.innerHTML = `

            <div class="cart-item-info">

                <h3>${book.name}</h3>

                <p>
                    ₹${book.price} per book
                </p>

            </div>


            <div class="quantity-controls">

                <button
                    onclick="changeQuantity(${index}, -1)"
                >
                    −
                </button>

                <span class="quantity">
                    ${book.quantity}
                </span>

                <button
                    onclick="changeQuantity(${index}, 1)"
                >
                    +
                </button>

            </div>


            <div class="cart-item-price">
                ₹${subtotal}
            </div>


            <button
                class="remove-btn"
                onclick="removeFromCart(${index})"
            >
                Remove
            </button>
        `;

        cartItems.appendChild(item);
    });


    updateCartSummary(
        total,
        itemCount
    );
}


// =========================
// CART SUMMARY
// =========================

function updateCartSummary(total, itemCount) {

    const cartTotal =
        document.getElementById("cartTotal");

    const finalTotal =
        document.getElementById("finalTotal");

    const itemElement =
        document.getElementById("itemCount");


    if (cartTotal) {
        cartTotal.textContent =
            "₹" + total;
    }

    if (finalTotal) {
        finalTotal.textContent =
            "₹" + total;
    }

    if (itemElement) {
        itemElement.textContent =
            itemCount;
    }
}


// =========================
// CHANGE QUANTITY
// =========================

function changeQuantity(index, change) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    if (!cart[index]) return;

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
    updateCartCount();
}


// =========================
// REMOVE FROM CART
// =========================

function removeFromCart(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
    updateCartCount();
}


// =========================
// CLEAR CART
// =========================

function clearCart() {

    localStorage.removeItem("cart");

    displayCart();
    updateCartCount();
}


// =========================
// CHECKOUT
// =========================

function checkout() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    window.location.href =
        "checkout.html";
}


// =========================
// DISPLAY WISHLIST
// =========================

function displayWishlist() {

    const container =
        document.getElementById("wishlistItems");

    if (!container) return;

    const wishlist =
        getWishlist();

    container.innerHTML = "";


    if (wishlist.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    ❤️
                </div>

                <h2>Your wishlist is empty</h2>

                <p>
                    Save books you want to read later.
                </p>

                <a
                    href="catalogue.html"
                    class="continue-shopping"
                >
                    Explore Books
                </a>

            </div>
        `;

        return;
    }


    wishlist.forEach(function (book, index) {

        const card =
            document.createElement("div");

        card.className =
            "wishlist-card";


        card.innerHTML = `

            <div>

                <span class="book-category">
                    ${book.category}
                </span>

                <h3>
                    ${book.name}
                </h3>

                <strong>
                    ₹${book.price}
                </strong>

            </div>


            <div class="wishlist-actions">

                <button
                    class="cart-btn"
                    onclick="addToCart('${book.name}', ${book.price})"
                >
                    Add to Cart
                </button>

                <button
                    class="remove-btn"
                    onclick="removeFromWishlist(${index})"
                >
                    Remove
                </button>

            </div>
        `;

        container.appendChild(card);
    });
}


// =========================
// REGISTER
// =========================

function registerUser(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const department =
        document.getElementById("department").value;


    if (name.length < 3) {

        alert(
            "Name must contain at least 3 characters."
        );

        return;
    }


    if (!email.includes("@")) {

        alert(
            "Please enter a valid email address."
        );

        return;
    }


    if (password.length < 6) {

        alert(
            "Password must contain at least 6 characters."
        );

        return;
    }


    if (password !== confirmPassword) {

        alert(
            "Passwords do not match."
        );

        return;
    }


    if (department === "") {

        alert(
            "Please select your department."
        );

        return;
    }


    const user = {

        name: name,
        email: email,
        password: password,
        department: department
    };


    localStorage.setItem(
        "registeredUser",
        JSON.stringify(user)
    );


    alert(
        "Registration successful! 🎉"
    );


    window.location.href =
        "login.html";
}


// =========================
// LOGIN
// =========================

function loginUser(event) {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail")
            .value.trim();

    const password =
        document.getElementById("loginPassword")
            .value;


    const savedUser =
        JSON.parse(
            localStorage.getItem("registeredUser")
        );


    if (!savedUser) {

        alert(
            "No registered account found. Please register first."
        );

        return;
    }


    if (
        email === savedUser.email &&
        password === savedUser.password
    ) {

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        alert(
            "Login successful! Welcome, " +
            savedUser.name +
            " 🎉"
        );

        window.location.href =
            "catalogue.html";

    } else {

        alert(
            "Invalid email or password."
        );
    }
}


// =========================
// NAVBAR USER
// =========================

function updateNavbar() {

    const loggedIn =
        localStorage.getItem("loggedIn");

    const savedUser =
        JSON.parse(
            localStorage.getItem("registeredUser")
        );


    if (!loggedIn || !savedUser) {
        return;
    }


    const navLinks =
        document.querySelector(".nav-links");

    if (!navLinks) {
        return;
    }


    const loginLink =
        navLinks.querySelector(
            'a[href="login.html"]'
        );


    if (loginLink) {

        loginLink.textContent =
            "Hi, " + savedUser.name;

        loginLink.href = "#";

        loginLink.onclick =
            function () {
                logoutUser();
            };
    }
}


// =========================
// LOGOUT
// =========================

function logoutUser() {

    localStorage.removeItem(
        "loggedIn"
    );

    alert(
        "You have been logged out."
    );

    window.location.href =
        "index.html";
}


// =========================
// PAGE LOAD
// =========================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayCart();

        updateCartCount();

        updateWishlistCount();

        updateNavbar();

        addBookActions();

        displayWishlist();
         
        loadBookDetails();

        loadDarkMode();

        loadCheckout();

        loadOrderSuccess();
    }
);
// =========================
// BOOK DETAILS PAGE
// =========================

function loadBookDetails() {

    const nameElement =
        document.getElementById("detailsName");

    if (!nameElement) {
        return;
    }


    const params =
        new URLSearchParams(window.location.search);


    const name =
        params.get("name");

    const price =
        Number(params.get("price"));

    const category =
        params.get("category");


    if (!name || !price) {
        nameElement.textContent =
            "Book not found";

        return;
    }


    document.getElementById(
        "detailsName"
    ).textContent = name;


    document.getElementById(
        "detailsPrice"
    ).textContent = "₹" + price;


    document.getElementById(
        "detailsCategory"
    ).textContent =
        category || "Book";


    const cartButton =
        document.getElementById(
            "detailsCartButton"
        );


    cartButton.onclick =
        function () {

            addToCart(name, price);

        };


    const wishlistButton =
        document.getElementById(
            "detailsWishlistButton"
        );


    wishlistButton.onclick =
        function () {

            addToWishlist(
                name,
                price,
                category
            );

        };
}
// =========================
// DARK MODE
// =========================

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

    const isDark =
        document.body.classList.contains("dark-mode");

    localStorage.setItem(
        "darkMode",
        isDark ? "enabled" : "disabled"
    );

    updateThemeButton();
}


function updateThemeButton() {

    const button =
        document.querySelector(".theme-btn");

    if (!button) return;

    const isDark =
        document.body.classList.contains("dark-mode");

    button.textContent =
        isDark ? "☀️" : "🌙";
}


function loadDarkMode() {

    const darkMode =
        localStorage.getItem("darkMode");

    if (darkMode === "enabled") {
        document.body.classList.add("dark-mode");
    }

    updateThemeButton();
}
// =========================
// CHECKOUT PAGE
// =========================

function loadCheckout() {

    const container =
        document.getElementById("checkoutItems");

    if (!container) {
        return;
    }

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    container.innerHTML = "";

    let total = 0;


    if (cart.length === 0) {

        container.innerHTML = `
            <p style="color:#777;">
                Your cart is empty.
            </p>

            <a
                href="catalogue.html"
                class="continue-shopping"
            >
                Browse Books
            </a>
        `;

        return;
    }


    cart.forEach(function (book) {

        const subtotal =
            book.price * book.quantity;

        total += subtotal;


        const item =
            document.createElement("div");

        item.className =
            "checkout-item";


        item.innerHTML = `
            <span>
                ${book.name} × ${book.quantity}
            </span>

            <span>
                ₹${subtotal}
            </span>
        `;


        container.appendChild(item);

    });


    const totalElement =
        document.getElementById("checkoutTotal");

    if (totalElement) {

        totalElement.textContent =
            "₹" + total;
    }
}


// =========================
// PLACE ORDER
// =========================

function placeOrder(event) {

    event.preventDefault();


    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add a book first."
        );

        window.location.href =
            "catalogue.html";

        return;
    }


    const pincode =
        document.getElementById("pincode").value.trim();


    if (!/^\d{6}$/.test(pincode)) {

        alert(
            "Please enter a valid 6-digit PIN code."
        );

        return;
    }


    const orderId =
        "OBS-" +
        Math.floor(
            10000 + Math.random() * 90000
        );


    const total =
        cart.reduce(function (sum, book) {

            return sum +
                book.price * book.quantity;

        }, 0);


    const order = {

        id: orderId,

        total: total,

        date: new Date().toLocaleDateString(),

        items: cart

    };


    localStorage.setItem(
        "lastOrder",
        JSON.stringify(order)
    );


    localStorage.removeItem("cart");


    window.location.href =
        "order-success.html";
}
// =========================
// ORDER SUCCESS PAGE
// =========================

function loadOrderSuccess() {

    const orderId =
        document.getElementById("orderId");

    if (!orderId) {
        return;
    }

    const order =
        JSON.parse(
            localStorage.getItem("lastOrder")
        );

    if (!order) {
        return;
    }

    document.getElementById("orderId")
        .textContent = order.id;

    document.getElementById("orderDate")
        .textContent = order.date;

    document.getElementById("orderTotal")
        .textContent = "₹" + order.total;
}
