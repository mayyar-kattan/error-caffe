// ======================================================
// ERROR CAFFE - MAIN JAVASCRIPT
// MERGED VERSION
// ======================================================


// ======================================================
// PRODUCTS
// ======================================================

const burgers = [
    {
        name: "Classic Burger",
        description: "Fresh Beef & Cheese",
        price: "15,000 SYP",
        image: "images/burger1.jpg",
        preparationTime: 10
    },
    {
        name: "Chicken Burger",
        description: "Crispy Chicken",
        price: "17,000 SYP",
        image: "images/burger2.jpg",
        preparationTime: 12
    },
    {
        name: "Double Burger",
        description: "Double Beef",
        price: "22,000 SYP",
        image: "images/burger3.jpg",
        preparationTime: 15
    }
];

const pizzas = [
    {
        name: "Margherita",
        description: "Mozzarella Cheese",
        price: "20,000 SYP",
        image: "images/pizza1.jpg",
        preparationTime: 18
    },
    {
        name: "Pepperoni",
        description: "Pepperoni & Cheese",
        price: "24,000 SYP",
        image: "images/pizza2.jpg",
        preparationTime: 20
    },
    {
        name: "BBQ Chicken",
        description: "BBQ Sauce",
        price: "26,000 SYP",
        image: "images/pizza3.jpg",
        preparationTime: 22
    }
];

const drinks = [
    {
        name: "Pepsi",
        description: "Cold Drink",
        price: "4,000 SYP",
        image: "images/drink1.jpg",
        preparationTime: 2
    },
    {
        name: "Orange Juice",
        description: "Fresh Juice",
        price: "8,000 SYP",
        image: "images/drink2.jpg",
        preparationTime: 5
    },
    {
        name: "Mojito",
        description: "Mint & Lemon",
        price: "9,000 SYP",
        image: "images/drink3.jpg",
        preparationTime: 6
    }
];


// ======================================================
// CART
// ======================================================

let cart = [];


// ======================================================
// GET ELEMENTS
// ======================================================

const cartIcon =
    document.querySelector(".cart-icon");

const cartCount =
    document.getElementById("cartCount");

const cartPopup =
    document.getElementById("cartPopup");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const popup =
    document.getElementById("popup");

const popupImage =
    document.getElementById("popupImage");

const popupTitle =
    document.getElementById("popupTitle");

const popupDescription =
    document.getElementById("popupDescription");

const popupPrice =
    document.getElementById("popupPrice");

const productNote =
    document.getElementById("productNote");

const closePopup =
    document.querySelector(".close");

const checkoutBtn =
    document.getElementById("checkoutBtn");

const tablePopup =
    document.getElementById("tablePopup");

const tableNumber =
    document.getElementById("tableNumber");

const tableContinue =
    document.getElementById("tableContinue");

const orderPopup =
    document.getElementById("orderPopup");

const orderTable =
    document.getElementById("orderTable");

const orderSummary =
    document.getElementById("orderSummary");

const orderTotal =
    document.getElementById("orderTotal");

const confirmOrder =
    document.getElementById("confirmOrder");


// ======================================================
// SELECTED PRODUCT
// ======================================================

let selectedProduct = null;


// ======================================================
// SELECTED TABLE
// ======================================================

let selectedTable = null;


// ======================================================
// CREATE PRODUCT CARDS
// ======================================================

function createCards(products, containerId) {

    const container =
        document.getElementById(containerId);

    if (!container) {
        return;
    }

    container.innerHTML = "";

    products.forEach(function(product) {

        container.innerHTML += `

            <div class="card">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div class="card-content">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ${product.description}
                    </p>

                    <div class="price">
                        ${product.price}
                    </div>

                    <button
                        class="order-btn"
                        data-name="${product.name}"
                        data-description="${product.description}"
                        data-price="${product.price}"
                        data-image="${product.image}"
                        data-preparation="${product.preparationTime}"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        `;

    });

}


// ======================================================
// DISPLAY PRODUCTS
// ======================================================

createCards(burgers, "burgerCards");
createCards(pizzas, "pizzaCards");
createCards(drinks, "drinkCards");


// ======================================================
// NAVBAR
// ======================================================

const header =
    document.querySelector("header");

let lastScrollY =
    window.scrollY;


window.addEventListener("scroll", function() {

    if (!header) {
        return;
    }

    const currentScrollY =
        window.scrollY;


    // Header background

    if (currentScrollY > 100) {

        header.style.background =
            "#000";

    } else {

        header.style.background =
            "rgba(0,0,0,.75)";

    }


    // Hide navbar while scrolling down

    if (
        currentScrollY > lastScrollY &&
        currentScrollY > 100
    ) {

        header.classList.add(
            "nav-hidden"
        );


        // Move cart to bottom

        if (cartIcon) {

            cartIcon.classList.add(
                "cart-bottom"
            );

        }

    } else {

        header.classList.remove(
            "nav-hidden"
        );


        // Move cart back to top

        if (cartIcon) {

            cartIcon.classList.remove(
                "cart-bottom"
            );

        }

    }


    lastScrollY =
        currentScrollY;

});


// ======================================================
// ADD TO CART / OPEN PRODUCT POPUP
// ======================================================

document.addEventListener("click", function(event) {

    if (
        !event.target.classList.contains(
            "order-btn"
        )
    ) {

        return;

    }


    const button =
        event.target;


    selectedProduct = {

        name:
            button.dataset.name,

        description:
            button.dataset.description,

        price:
            button.dataset.price,

        image:
            button.dataset.image,

        preparationTime:
            Number(
                button.dataset.preparation
            ) || 10

    };


    // Fill popup

    if (popupImage) {

        popupImage.src =
            selectedProduct.image;

    }


    if (popupTitle) {

        popupTitle.innerText =
            selectedProduct.name;

    }


    if (popupDescription) {

        popupDescription.innerText =
            selectedProduct.description;

    }


    if (popupPrice) {

        popupPrice.innerText =
            selectedProduct.price;

    }


    // Clear previous note

    if (productNote) {

        productNote.value =
            "";

    }


    // Open popup

    if (popup) {

        popup.style.display =
            "flex";

    }

});


// ======================================================
// ADD PRODUCT FROM POPUP
// ======================================================

const popupAddButton =
    document.querySelector(".popup-btn");


if (popupAddButton) {

    popupAddButton.addEventListener(
        "click",
        function() {

            if (!selectedProduct) {

                return;

            }


            // Get note

            const note =
                productNote
                    ? productNote.value.trim()
                    : "";


            // Check same product + same note

            const existingProduct =
                cart.find(function(item) {

                    return (
                        item.name ===
                            selectedProduct.name &&

                        item.note ===
                            note
                    );

                });


            // Increase quantity

            if (existingProduct) {

                existingProduct.quantity++;

            }


            // New cart item

            else {

                cart.push({

                    name:
                        selectedProduct.name,

                    description:
                        selectedProduct.description,

                    price:
                        selectedProduct.price,

                    image:
                        selectedProduct.image,

                    preparationTime:
                        selectedProduct.preparationTime,

                    note:
                        note,

                    quantity:
                        1

                });

            }


            // Update cart

            updateCartCount();


            // Notification

            showCartNotification(
                selectedProduct.name
            );


            // Close popup

            if (popup) {

                popup.style.display =
                    "none";

            }


            // Clear note

            if (productNote) {

                productNote.value =
                    "";

            }


            selectedProduct =
                null;

        }
    );

}


// ======================================================
// UPDATE CART COUNT
// ======================================================

function updateCartCount() {

    let totalItems = 0;


    cart.forEach(function(item) {

        totalItems +=
            item.quantity;

    });


    if (cartCount) {

        cartCount.innerText =
            totalItems;

    }

}


// ======================================================
// CLOSE PRODUCT POPUP
// ======================================================

if (closePopup) {

    closePopup.addEventListener(
        "click",
        function() {

            if (popup) {

                popup.style.display =
                    "none";

            }

            selectedProduct =
                null;

        }
    );

}


if (popup) {

    popup.addEventListener(
        "click",
        function(event) {

            if (
                event.target === popup
            ) {

                popup.style.display =
                    "none";

                selectedProduct =
                    null;

            }

        }
    );

}


// ======================================================
// OPEN CART
// ======================================================

if (cartIcon) {

    cartIcon.addEventListener(
        "click",
        function() {

            renderCart();


            if (cartPopup) {

                cartPopup.style.display =
                    "flex";

            }

        }
    );

}


// ======================================================
// CLOSE CART
// ======================================================

if (closeCart) {

    closeCart.addEventListener(
        "click",
        function() {

            if (cartPopup) {

                cartPopup.style.display =
                    "none";

            }

        }
    );

}


// ======================================================
// CLOSE CART OUTSIDE
// ======================================================

if (cartPopup) {

    cartPopup.addEventListener(
        "click",
        function(event) {

            if (
                event.target === cartPopup
            ) {

                cartPopup.style.display =
                    "none";

            }

        }
    );

}


// ======================================================
// RENDER CART
// ======================================================

function renderCart() {

    if (!cartItems) {

        return;

    }


    cartItems.innerHTML =
        "";

    let total = 0;


    // Empty cart

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p style="
                text-align:center;
                opacity:.6;
            ">
                Your cart is empty 🛒
            </p>

        `;


        if (cartTotal) {

            cartTotal.innerText =
                "0 SYP";

        }


        return;

    }


    // Products

    cart.forEach(
        function(item, index) {

            const priceNumber =
                parseInt(
                    item.price.replace(
                        /[^0-9]/g,
                        ""
                    )
                );


            const itemTotal =
                priceNumber *
                item.quantity;


            total +=
                itemTotal;


            cartItems.innerHTML += `

                <div class="cart-item">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >


                    <div class="cart-item-info">

                        <h4>
                            ${item.name}
                        </h4>

                        <p>
                            ${item.price}
                        </p>


                        ${
                            item.note
                                ? `
                                    <p class="cart-note">
                                        📝 ${item.note}
                                    </p>
                                `
                                : ""
                        }

                    </div>


                    <div class="quantity-controls">

                        <button
                            onclick="decreaseQuantity(${index})"
                        >
                            −
                        </button>


                        <span>
                            ${item.quantity}
                        </span>


                        <button
                            onclick="increaseQuantity(${index})"
                        >
                            +
                        </button>

                    </div>

                </div>

            `;

        }
    );


    // Total

    if (cartTotal) {

        cartTotal.innerText =
            total.toLocaleString() +
            " SYP";

    }

}


// ======================================================
// INCREASE QUANTITY
// ======================================================

function increaseQuantity(index) {

    if (!cart[index]) {

        return;

    }


    cart[index].quantity++;


    updateCartCount();

    renderCart();

}


// ======================================================
// DECREASE QUANTITY
// ======================================================

function decreaseQuantity(index) {

    if (!cart[index]) {

        return;

    }


    cart[index].quantity--;


    if (
        cart[index].quantity <= 0
    ) {

        cart.splice(index, 1);

    }


    updateCartCount();

    renderCart();

}


// ======================================================
// GET CART TOTAL
// ======================================================

function getCartTotal() {

    let total = 0;


    cart.forEach(function(item) {

        const priceNumber =
            parseInt(
                item.price.replace(
                    /[^0-9]/g,
                    ""
                )
            );


        total +=
            priceNumber *
            item.quantity;

    });


    return total;

}


// ======================================================
// CALCULATE PREPARATION TIME
// ======================================================

function calculatePreparationTime() {

    if (
        cart.length === 0
    ) {

        return 0;

    }


    let longestFoodTime = 0;

    let totalFoodQuantity = 0;

    let drinksCount = 0;


    cart.forEach(function(item) {

        const time =
            Number(
                item.preparationTime
            ) || 10;


        const isDrink =
            item.name === "Pepsi" ||
            item.name === "Orange Juice" ||
            item.name === "Mojito";


        if (isDrink) {

            drinksCount +=
                item.quantity;

        } else {

            totalFoodQuantity +=
                item.quantity;


            if (
                time > longestFoodTime
            ) {

                longestFoodTime =
                    time;

            }

        }

    });


    // Base time

    let estimatedTime;


    if (
        longestFoodTime > 0
    ) {

        estimatedTime =
            longestFoodTime;

    } else {

        estimatedTime =
            5;

    }


    // Extra quantity

    if (
        totalFoodQuantity > 1
    ) {

        estimatedTime +=
            (
                totalFoodQuantity - 1
            ) * 2;

    }


    // Different food items

    const differentFoodItems =
        cart.filter(function(item) {

            return (
                item.name !== "Pepsi" &&
                item.name !== "Orange Juice" &&
                item.name !== "Mojito"
            );

        }).length;


    if (
        differentFoodItems > 1
    ) {

        estimatedTime +=
            (
                differentFoodItems - 1
            ) * 3;

    }


    // Drinks

    if (
        drinksCount > 0
    ) {

        estimatedTime +=
            2;

    }


    // Minimum

    estimatedTime =
        Math.max(
            estimatedTime,
            5
        );


    // Maximum

    estimatedTime =
        Math.min(
            estimatedTime,
            60
        );


    return Math.round(
        estimatedTime
    );

}


// ======================================================
// CONTINUE ORDER
// ======================================================

if (checkoutBtn) {

    checkoutBtn.addEventListener(
        "click",
        function() {

            if (
                cart.length === 0
            ) {

                alert(
                    "Your cart is empty!"
                );

                return;

            }


            // Close cart

            if (cartPopup) {

                cartPopup.style.display =
                    "none";

            }


            // Open table popup

            if (tablePopup) {

                tablePopup.style.display =
                    "flex";

            }


            // Focus table input

            if (tableNumber) {

                tableNumber.value =
                    "";

                setTimeout(
                    function() {

                        tableNumber.focus();

                    },
                    200
                );

            }

        }
    );

}


// ======================================================
// TABLE NUMBER
// ======================================================

if (tableContinue) {

    tableContinue.addEventListener(
        "click",
        function() {

            const table =
                tableNumber
                    ? tableNumber.value.trim()
                    : "";


            // Validate table

            if (
                table === "" ||
                Number(table) < 1
            ) {

                alert(
                    "Please enter your table number."
                );


                if (tableNumber) {

                    tableNumber.focus();

                }


                return;

            }


            // Save selected table

            selectedTable =
                table;


            // Calculate total

            const total =
                getCartTotal();


            // Display table

            if (orderTable) {

                orderTable.innerText =
                    "🪑 Table Number: " +
                    selectedTable;

            }


            // Clear summary

            if (orderSummary) {

                orderSummary.innerHTML =
                    "";

            }


            // Build summary

            cart.forEach(function(item) {

                const priceNumber =
                    parseInt(
                        item.price.replace(
                            /[^0-9]/g,
                            ""
                        )
                    );


                const itemTotal =
                    priceNumber *
                    item.quantity;


                if (orderSummary) {

                    orderSummary.innerHTML += `

                        <div style="
                            display:flex;
                            justify-content:space-between;
                            margin:10px 0;
                            gap:15px;
                        ">

                            <div>

                                <span>
                                    ${item.name}
                                    ×
                                    ${item.quantity}
                                </span>


                                ${
                                    item.note
                                        ? `
                                            <div style="
                                                font-size:13px;
                                                opacity:.8;
                                                margin-top:4px;
                                            ">
                                                📝 ${item.note}
                                            </div>
                                        `
                                        : ""
                                }

                            </div>


                            <span>
                                ${itemTotal.toLocaleString()}
                                SYP
                            </span>

                        </div>

                    `;

                }

            });


            // Total

            if (orderTotal) {

                orderTotal.innerText =
                    total.toLocaleString() +
                    " SYP";

            }


            // Estimated time

            const estimatedTime =
                calculatePreparationTime();


            const estimatedTimeElement =
                document.getElementById(
                    "estimatedTime"
                );


            if (estimatedTimeElement) {

                estimatedTimeElement.innerText =
                    estimatedTime +
                    " min";

            }


            // Reset confirmation button

            if (confirmOrder) {

                confirmOrder.disabled =
                    false;

                confirmOrder.innerText =
                    "Confirm Order";

            }


            // Close table popup

            if (tablePopup) {

                tablePopup.style.display =
                    "none";

            }


            // Open order popup

            if (orderPopup) {

                orderPopup.style.display =
                    "flex";

            }

        }
    );

}


// ======================================================
// PREPARATION COUNTDOWN
// ======================================================

let preparationTimer =
    null;

let remainingTime =
    0;


// ======================================================
// UPDATE COUNTDOWN
// ======================================================

function updatePreparationTimer() {

    const estimatedTimeElement =
        document.getElementById(
            "estimatedTime"
        );


    if (
        !estimatedTimeElement
    ) {

        return;

    }


    const minutes =
        Math.floor(
            remainingTime / 60
        );


    const seconds =
        remainingTime % 60;


    estimatedTimeElement.innerText =
        minutes +
        ":" +
        String(seconds).padStart(
            2,
            "0"
        ) +
        " min";

}


// ======================================================
// START PREPARATION TIMER
// ======================================================

function startPreparationTimer(minutes) {

    // Stop old timer

    if (
        preparationTimer
    ) {

        clearInterval(
            preparationTimer
        );

    }


    // Convert to seconds

    remainingTime =
        minutes * 60;


    // Initial display

    updatePreparationTimer();


    // Start countdown

    preparationTimer =
        setInterval(
            function() {

                remainingTime--;


                updatePreparationTimer();


                // Finished

                if (
                    remainingTime <= 0
                ) {

                    clearInterval(
                        preparationTimer
                    );


                    preparationTimer =
                        null;


                    const estimatedTimeElement =
                        document.getElementById(
                            "estimatedTime"
                        );


                    if (
                        estimatedTimeElement
                    ) {

                        estimatedTimeElement.innerText =
                            "Ready! 🍔";

                    }

                }

            },
            1000
        );

}


// ======================================================
// CONFIRM ORDER
// ======================================================

if (confirmOrder) {

    confirmOrder.addEventListener(
        "click",
        function() {

            // Check cart

            if (
                cart.length === 0
            ) {

                alert(
                    "Your cart is empty!"
                );

                return;

            }


            // Check table

            if (
                !selectedTable
            ) {

                alert(
                    "Please enter your table number."
                );

                return;

            }


            // Prevent double click

            if (
                confirmOrder.disabled
            ) {

                return;

            }


            // Calculate total

            const total =
                getCartTotal();


            // Calculate preparation time

            const estimatedTime =
                calculatePreparationTime();


            // Current date/time

            const now =
                new Date();


            // Local date
            // IMPORTANT:
            // This matches the Admin Dashboard date format.

            const orderDate =
                now.getFullYear() +
                "-" +
                String(
                    now.getMonth() + 1
                ).padStart(2, "0") +
                "-" +
                String(
                    now.getDate()
                ).padStart(2, "0");


            const orderTime =
                now.toLocaleTimeString(
                    [],
                    {
                        hour: "2-digit",
                        minute: "2-digit"
                    }
                );


            // ==================================================
            // CREATE ADMIN ITEMS STRING
            // ==================================================

            let adminItems = "";


            cart.forEach(function(item, index) {

                adminItems +=
                    item.name +
                    " x" +
                    item.quantity;


                if (item.note) {

                    adminItems +=
                        " [Note: " +
                        item.note +
                        "]";

                }


                if (
                    index <
                    cart.length - 1
                ) {

                    adminItems +=
                        " | ";

                }

            });


            // ==================================================
            // CREATE ORDER
            // ==================================================

            const order = {

                id:
                    Date.now(),

                table:
                    selectedTable,

                items:
                    adminItems,

                total:
                    total,

                date:
                    orderDate,

                time:
                    orderTime,

                preparationTime:
                    estimatedTime,

                // Keep detailed items too

                itemDetails:
                    cart.map(function(item) {

                        return {

                            name:
                                item.name,

                            description:
                                item.description,

                            quantity:
                                item.quantity,

                            price:
                                parseInt(
                                    item.price.replace(
                                        /[^0-9]/g,
                                        ""
                                    )
                                ),

                            note:
                                item.note || ""

                        };

                    })

            };


            // ==================================================
            // SAVE ORDER TO LOCAL STORAGE
            // ==================================================

            const orders =
                JSON.parse(
                    localStorage.getItem(
                        "orders"
                    )
                ) || [];


            orders.push(order);


            localStorage.setItem(
                "orders",
                JSON.stringify(orders)
            );


            // ==================================================
            // START PREPARATION TIMER
            // ==================================================

            startPreparationTimer(
                estimatedTime
            );


            // ==================================================
            // CREATE WHATSAPP MESSAGE
            // ==================================================

            let message =
                "🛎️ *NEW ORDER*%0A%0A";


            message +=
                "🪑 *Table:* " +
                selectedTable +
                "%0A%0A";


            message +=
                "🛒 *ORDER:*%0A";


            cart.forEach(function(item) {

                const priceNumber =
                    parseInt(
                        item.price.replace(
                            /[^0-9]/g,
                            ""
                        )
                    );


                const itemTotal =
                    priceNumber *
                    item.quantity;


                message +=
                    "🍽️ " +
                    item.name +
                    " × " +
                    item.quantity +
                    " — " +
                    itemTotal.toLocaleString() +
                    " SYP";


                if (item.note) {

                    message +=
                        "%0A📝 Note: " +
                        encodeURIComponent(
                            item.note
                        );

                }


                message +=
                    "%0A";

            });


            // Total

            message +=
                "%0A💰 *Total Without Taxes:* " +
                total.toLocaleString() +
                " SYP";


            // Preparation time

            message +=
                "%0A⏱️ *Estimated Preparation Time:* " +
                estimatedTime +
                " minutes";


            // ==================================================
            // WHATSAPP NUMBER
            // ==================================================

            const whatsappNumber =
                "963991048151";


            // ==================================================
            // WHATSAPP URL
            // ==================================================

            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                message;


            // ==================================================
            // OPEN WHATSAPP
            // ==================================================

            window.open(
                whatsappURL,
                "_blank"
            );


            // ==================================================
            // CHANGE BUTTON
            // ==================================================

            confirmOrder.disabled =
                true;

            confirmOrder.innerText =
                "Order Confirmed ✓";


            // ==================================================
            // CLOSE ORDER POPUP
            // ==================================================

            if (orderPopup) {

                orderPopup.style.display =
                    "none";

            }


            // ==================================================
            // CLEAR CART
            // ==================================================

            cart = [];


            updateCartCount();

            renderCart();


            // Clear selected table

            selectedTable =
                null;

        }
    );

}


// ======================================================
// CLOSE ORDER POPUP
// ======================================================

if (orderPopup) {

    orderPopup.addEventListener(
        "click",
        function(event) {

            if (
                event.target === orderPopup
            ) {

                orderPopup.style.display =
                    "none";

            }

        }
    );

}


// ======================================================
// ERROR SPLASH
// ======================================================

window.addEventListener(
    "load",
    function() {

        const splash =
            document.getElementById(
                "splash"
            );


        if (!splash) {

            return;

        }


        setTimeout(
            function() {

                splash.classList.add(
                    "hide"
                );

            },
            2500
        );

    }
);


// ======================================================
// CART NOTIFICATION
// ======================================================

function showCartNotification(productName) {

    const notification =
        document.getElementById(
            "cartNotification"
        );

    const text =
        document.getElementById(
            "notificationText"
        );


    if (
        !notification ||
        !text
    ) {

        return;

    }


    text.textContent =
        productName +
        " added to cart!";


    notification.classList.add(
        "show"
    );


    setTimeout(
        function() {

            notification.classList.remove(
                "show"
            );

        },
        2500
    );

}


// ======================================================
// INITIAL CART
// ======================================================

updateCartCount();
