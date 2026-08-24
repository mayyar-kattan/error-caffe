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

                <button class="order-btn">Order Now</button>

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
// NAVBAR EFFECT
// ===============================

// ===============================
// NAVBAR HIDE / SHOW ON SCROLL
// ===============================

const header = document.querySelector("header");

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {

    const currentScrollY = window.scrollY;

    // Background
    if (currentScrollY > 100) {
        header.style.background = "#000";
    } else {
        header.style.background = "rgba(0,0,0,.75)";
    }

    // Hide when scrolling down
    if (currentScrollY > lastScrollY && currentScrollY > 100) {

        header.classList.add("nav-hidden");

    }

    // Show when scrolling up
    else if (currentScrollY < lastScrollY) {

        header.classList.remove("nav-hidden");

    }

    lastScrollY = currentScrollY;

});

// ===============================
// ORDER BUTTON
// ===============================

const popup = document.getElementById("popup");

const popupImage = document.getElementById("popupImage");

const popupTitle = document.getElementById("popupTitle");

const popupDescription = document.getElementById("popupDescription");

const popupPrice = document.getElementById("popupPrice");

document.addEventListener("click", (e) => {

    if (e.target.classList.contains("order-btn")) {

        const card = e.target.closest(".card");

        popupImage.src = card.querySelector("img").src;

        popupTitle.innerText = card.querySelector("h3").innerText;

        popupDescription.innerText = card.querySelector("p").innerText;

        popupPrice.innerText = card.querySelector(".price").innerText;

        popup.style.display = "flex";

    }

});

document.querySelector(".close").onclick = function() {

    popup.style.display = "none";

}

window.onclick = function(e) {

        if (e.target == popup) {

            popup.style.display = "none";

        }

    }
    // ===============================
    // ERROR SPLASH
    // ===============================

window.addEventListener("load", () => {

    const splash = document.getElementById("splash");

    setTimeout(() => {

        splash.classList.add("hide");

    }, 2500);

});