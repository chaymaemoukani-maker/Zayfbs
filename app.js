
let produits = [
    {
        titre: "Huile 500ml",
        prix: 120,
        image: "image/télécharger (1).png",
        description: "Huile pure"
    },
    {
        titre: "Huile Bio 1L",
        prix: 130,
        image: "image/1l.png",
        description: "Huile naturelle"
    },
     {
        titre: "Huile  Premium 750ml",
        prix: 100,
        image: "image/750l.png",
        description: "Huile riche "
    },
     {
        titre: "Huile Traditionnelle 5L",
        prix: 550,
        image: "image/5l.png",
        description: "Huile authentique "
    },
];


const productContainer = document.querySelector(".product-container");

const form = document.getElementById("product-form");
const showFormBtn = document.getElementById("show-form-btn");

const list = document.getElementById("panier-list");
const totalText = document.getElementById("total");

let total = 0;



function afficherProduits() {

    if (!productContainer) return;

    productContainer.innerHTML = "";

    produits.forEach((produit, index) => {

        const card = document.createElement("div");
        card.classList.add("card", "product-card");

        card.innerHTML = `
            <img src="${produit.image}" alt="produit">
            <h3>${produit.titre}</h3>
            <p class="price">${produit.prix} DH</p>
            <p>${produit.description}</p>

            <button class="add-btn">Ajouter au panier</button>
            
            <button class="delete-btn">Supprimer</button>
        `;

        const addBtn = card.querySelector(".add-btn");
        addBtn.addEventListener("click", () => {

            if (!list || !totalText) return;

            const li = document.createElement("li");
            li.innerText = `${produit.titre} - ${produit.prix} DH`;
            list.appendChild(li);

            total += produit.prix;
            totalText.innerText = "Total: " + total + " DH";
        });

        // 🔴 DELETE PRODUIT
        const deleteBtn = card.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
            supprimerProduit(index);
        });

        productContainer.appendChild(card);
    });
}



function supprimerProduit(index) {
    produits.splice(index, 1);
    afficherProduits();
}



if (showFormBtn) {
    showFormBtn.addEventListener("click", () => {
        form.style.display = "block";
    });
}


if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const image = document.getElementById("image").value;
        const description = document.getElementById("description").value;
        const price = parseFloat(document.getElementById("price").value);

        // 🟡 validation بسيطة
        if (!title || !image || !description || price <= 0) {
            alert("Remplir les champs correctement !");
            return;
        }

        // 🟢 ajouter ف array
        produits.push({
            titre: title,
            prix: price,
            image: image,
            description: description
        });

        afficherProduits();

        form.reset();
        form.style.display = "none";
    });
}


afficherProduits();