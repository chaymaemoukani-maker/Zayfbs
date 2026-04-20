let cart = [];

function openCart() {
    document.getElementById("cartSidebar").classList.add("active");
    displayCart();
}

function closeCart() {
    document.getElementById("cartSidebar").classList.remove("active");
}

document.querySelectorAll(".add-btn").forEach(btn => {
    btn.addEventListener("click", () => {

        const card = btn.closest(".card");
        const name = card.querySelector("h3").textContent;
        const priceText = card.querySelector(".price").textContent;
        const price = parseInt(priceText);

        cart.push({ name, price });

        displayCart();
    });
});

function displayCart() {
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        const div = document.createElement("div");
        div.innerHTML = `
            <p>${item.name} - ${item.price} DH 
            <button onclick="removeItem(${index})">❌</button></p>
        `;
        cartItems.appendChild(div);
    });

    cartTotal.textContent = total + " DH";
}

function removeItem(index) {
    cart.splice(index, 1);
    displayCart();
}
function openModal() {
    document.getElementById("modalOverlay").classList.add("active");
}

function closeModal() {
    document.getElementById("modalOverlay").classList.remove("active");
}

function addProduct() {
    const name = document.getElementById("pName").value;
    const price = document.getElementById("pPrice").value;
    const image = document.getElementById("pImage").value;
    const desc = document.getElementById("pDesc").value;

    const container = document.querySelector(".cards-container");

    const card = document.createElement("div");
    card.classList.add("card", "product-card");

    card.innerHTML = `
        <img src="${image}" alt="produit">
        <h3>${name}</h3>
        <p class="price">${price} DH</p>
        <p>${desc}</p>
        <button class="add-btn">Ajouter au panier</button>
        <button class="delete-btn">Supprimer</button>
    `;

    container.appendChild(card);

    card.querySelector(".delete-btn").addEventListener("click", () => {
        card.remove();
    });

    // 🛒 add to cart
    card.querySelector(".add-btn").addEventListener("click", () => {
        const priceNum = parseInt(price);
        cart.push({ name, price: priceNum });
        displayCart();
    });

    closeModal();
}
document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".card");
        card.remove();
    });
});