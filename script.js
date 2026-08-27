// ===============================
// PRODUCTS
// ===============================

const burgers = [{
        name: "Classic Burger",
        description: "Fresh Beef & Cheese",
        price: "15,000 SYP",
        image: "images/burger1.jpg"
    },
    {
        name: "Chicken Burger",
        description: "Crispy Chicken",
        price: "17,000 SYP",
        image: "images/burger2.jpg"
    },
    {
        name: "Double Burger",
        description: "Double Beef",
        price: "22,000 SYP",
        image: "images/burger3.jpg"
    }
];

const pizzas = [{
        name: "Margherita",
        description: "Mozzarella Cheese",
        price: "20,000 SYP",
        image: "images/pizza1.jpg"
    },
    {
        name: "Pepperoni",
        description: "Pepperoni & Cheese",
        price: "24,000 SYP",
        image: "images/pizza2.jpg"
    },
    {
        name: "BBQ Chicken",
        description: "BBQ Sauce",
        price: "26,000 SYP",
        image: "images/pizza3.jpg"
    }
];

const drinks = [{
        name: "Pepsi",
        description: "Cold Drink",
        price: "4,000 SYP",
        image: "images/drink1.jpg"
    },
    {
        name: "Orange Juice",
        description: "Fresh Juice",
        price: "8,000 SYP",
        image: "images/drink2.jpg"
    },
    {
        name: "Mojito",
        description: "Mint & Lemon",
        price: "9,000 SYP",
        image: "images/drink3.jpg"
    }
];

// ===============================
// CART
// ===============================

let cart = [];

const cartCount = document.getElementById("cartCount");

// ===============================
// CREATE CARD
// ===============================

function createCards(data, containerId) {

    const container = document.getElementById(containerId);

    data.forEach(item => {

        container.innerHTML += `

        <div class="card">

            <img src="${item.image}" alt="${item.name}">

            <div class="card-content">

                <h3>${item.name}</h3>

                <p>${item.description}</p>

                <div class="price">${item.price}</div>

                <button 
                    class="order-btn"
                    data-name="${item.name}"
                    data-description="${item.description}"
                    data-price="${item.price}"
                    data-image="${item.image}">
                    Add to Cart
                </button>

            </div>

        </div>

        `;

    });

}

// ===============================
// SHOW PRODUCTS
// ===============================

createCards(burgers, "burgerCards");
createCards(pizzas, "pizzaCards");
createCards(drinks, "drinkCards");

// ===============================
// NAVBAR HIDE / SHOW ON SCROLL
// ===============================

const header = document.querySelector("header");

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {

    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {

        header.style.background = "#000";

    } else {

        header.style.background = "rgba(0,0,0,.75)";

    }

    if (currentScrollY > lastScrollY && currentScrollY > 100) {

        header.classList.add("nav-hidden");

    } else if (currentScrollY < lastScrollY) {

        header.classList.remove("nav-hidden");

    }

    lastScrollY = currentScrollY;

});

// ===============================
// ORDER BUTTON + CART
// ===============================

const popup = document.getElementById("popup");

const popupImage = document.getElementById("popupImage");

const popupTitle = document.getElementById("popupTitle");

const popupDescription = document.getElementById("popupDescription");

const popupPrice = document.getElementById("popupPrice");

document.addEventListener("click", (e) => {

    if (e.target.classList.contains("order-btn")) {

        const name = e.target.dataset.name;
        const description = e.target.dataset.description;
        const price = e.target.dataset.price;
        const image = e.target.dataset.image;

        // ===============================
        // ADD PRODUCT TO CART
        // ===============================

        const existingProduct = cart.find(item => item.name === name);

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                name: name,
                description: description,
                price: price,
                image: image,
                quantity: 1
            });

        }

        // Update cart number

        updateCartCount();

        // ===============================
        // OPEN PRODUCT POPUP
        // ===============================

        popupImage.src = image;

        popupTitle.innerText = name;

        popupDescription.innerText = description;

        popupPrice.innerText = price;

        popup.style.display = "flex";

    }

});

// ===============================
// UPDATE CART COUNT
// ===============================

function updateCartCount() {

    let totalItems = 0;

    cart.forEach(item => {

        totalItems += item.quantity;

    });

    cartCount.innerText = totalItems;

}

// ===============================
// CLOSE POPUP
// ===============================

document.querySelector(".close").onclick = function() {

    popup.style.display = "none";

};

window.addEventListener("click", function(e) {

    if (e.target === popup) {

        popup.style.display = "none";

    }

});

// ===============================
// ERROR SPLASH
// ===============================

window.addEventListener("load", () => {

    const splash = document.getElementById("splash");

    setTimeout(() => {

        splash.classList.add("hide");

    }, 2500);

});
// ===============================
// CART WINDOW
// ===============================

const cartIcon = document.querySelector(".cart-icon");

const cartPopup = document.getElementById("cartPopup");

const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");

const cartTotal = document.getElementById("cartTotal");


// Open Cart

cartIcon.addEventListener("click", () => {

    renderCart();

    cartPopup.style.display = "flex";

});


// ===============================
// CLOSE CART
// ===============================

closeCart.addEventListener("click", function() {

    cartPopup.style.display = "none";

});


// Close when clicking outside

cartPopup.addEventListener("click", (e) => {

    if (e.target === cartPopup) {

        cartPopup.style.display = "none";

    }

});


// ===============================
// DISPLAY CART
// ===============================

function renderCart() {

    cartItems.innerHTML = "";

    let total = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="text-align:center; opacity:.6;">
                Your cart is empty 🛒
            </p>
        `;

        cartTotal.innerText = "0 SYP";

        return;
    }


    cart.forEach((item, index) => {

        // Convert price from "15,000 SYP" to number

        const priceNumber = parseInt(
            item.price.replace(/[^0-9]/g, "")
        );

        const itemTotal = priceNumber * item.quantity;

        total += itemTotal;


        cartItems.innerHTML += `

            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div class="cart-item-info">

                    <h4>${item.name}</h4>

                    <p>${item.price}</p>

                </div>


                <div class="quantity-controls">

                    <button onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>

            </div>

        `;

    });


    cartTotal.innerText =
        total.toLocaleString() + " SYP";

}


// ===============================
// INCREASE QUANTITY
// ===============================

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCartCount();

    renderCart();

}


// ===============================
// DECREASE QUANTITY
// ===============================

function decreaseQuantity(index) {

    cart[index].quantity--;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    updateCartCount();

    renderCart();

}
// ===============================
// TABLE NUMBER
// ===============================

const checkoutBtn = document.getElementById("checkoutBtn");

const tablePopup = document.getElementById("tablePopup");

const tableContinue = document.getElementById("tableContinue");

const tableNumber = document.getElementById("tableNumber");


// ===============================
// OPEN TABLE POPUP
// ===============================

checkoutBtn.addEventListener("click", function() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    document.getElementById("cartPopup").style.display = "none";

    tablePopup.style.display = "flex";

    tableNumber.value = "";

    tableNumber.focus();

});


// ===============================
// CONTINUE
// ===============================

const orderPopup = document.getElementById("orderPopup");

const orderTable = document.getElementById("orderTable");

const orderSummary = document.getElementById("orderSummary");

const orderTotal = document.getElementById("orderTotal");


let selectedTable = null;


tableContinue.addEventListener("click", function() {

    const number = tableNumber.value.trim();


    // Table number is required

    if (number === "" || Number(number) < 1) {

        alert("Please enter your table number.");

        tableNumber.focus();

        return;

    }


    // Save table number

    selectedTable = number;


    // Close table popup

    tablePopup.style.display = "none";


    // Table number

    orderTable.innerText =
        "Table Number: " + selectedTable;


    // Create order summary

    orderSummary.innerHTML = "";


    let total = 0;


    cart.forEach(function(item) {

        const priceNumber = parseInt(
            item.price.replace(/[^0-9]/g, "")
        );


        const itemTotal =
            priceNumber * item.quantity;


        total += itemTotal;


        orderSummary.innerHTML += `

            <div style="
                display:flex;
                justify-content:space-between;
                margin:10px 0;
            ">

                <span>
                    ${item.name} × ${item.quantity}
                </span>

                <span>
                    ${itemTotal.toLocaleString()} SYP
                </span>

            </div>

        `;

    });


    // Total

    orderTotal.innerText =
        total.toLocaleString() + " SYP";


    // Show confirmation

    orderPopup.style.display = "flex";

});
// ===============================
// CONFIRM ORDER - WHATSAPP
// ===============================

const confirmOrder = document.getElementById("confirmOrder");

confirmOrder.addEventListener("click", function() {

    if (!selectedTable || cart.length === 0) {

        alert("Please complete your order first.");

        return;

    }


    let message = "🛎️ *NEW ORDER*%0A%0A";

    message += "🪑 *Table:* " + selectedTable + "%0A%0A";


    let total = 0;


    cart.forEach(function(item) {

        const priceNumber = parseInt(
            item.price.replace(/[^0-9]/g, "")
        );

        const itemTotal =
            priceNumber * item.quantity;

        total += itemTotal;


        message +=
            "🍽️ " +
            item.name +
            " × " +
            item.quantity +
            " — " +
            itemTotal.toLocaleString() +
            " SYP%0A";

    });


    message += "%0A💰 *Total (Without Taxes !):* " +
        total.toLocaleString() +
        " SYP";


    // WhatsApp number

    const phoneNumber = "+963991048151";


    // Open WhatsApp

    const whatsappURL =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        message;


    window.open(
        whatsappURL,
        "_blank"
    );

});
