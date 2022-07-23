// Fonction créée dans le but de vérifier si la panier est vide, si c'est le cas, redirection vers la page d'accueil
const isCartEmpty = (cart) => {
  const errorMessageEmptyCart =
    "Votre panier est vide, vous allez être redirigé vers la page d'accueil";
  if (cart === null || cart.length === 0) {
    window.alert(errorMessageEmptyCart);
    window.location.href = "index.html";
    return;
  }
}

// Fonction créée dans le but d'afficher le panier récupéré dans le localStorage
const showCart = async (cart) => {

  const insideCart = loadCart();
  const cartWithPrice = [];
  isCartEmpty(insideCart);

  //Récupérer les prix
  const productList = await get("http://localhost:3000/api/products");

  insideCart.forEach((item) => {

    const indexOfProductForPrice = productList.find(
      (product) => product._id === item._id
    );

    const productWithPrice = {
      _id: item._id,
      altTxt: item.altTxt,
      name: item.name,
      description: item.description,
      imageUrl: item.imageUrl,
      color: item.color,
      qty: item.qty,
      price: indexOfProductForPrice.price,
    };

    cartWithPrice.push(productWithPrice);
  });

  getItems = document.getElementById("cart__items");
  let insertCartHTML = "";
  let qtyKanap = 0;
  calculTotalQty(cartWithPrice);
  cartWithPrice.forEach((order) => {
    qtyKanap = order.qty

    insertCartHTML += `<article class="cart__item" data-id="${order._id}" data-color="${order.color}">
        <div class="cart__item__img">
                  <img src="${order.imageUrl}" alt="${order.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${order.name}</h2>
                    <p>${order.color}</p>
                    <p>${order.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${order.qty}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
  });
  getItems.innerHTML = insertCartHTML;

  // Changer la quantité de produits sélectionnés + vérification de ne pas dépasser 100 et de ne pas avoir moins de 1 produits
  document.querySelectorAll(".itemQuantity").forEach((changeItemQty) => {
    changeItemQty.addEventListener("change", (event) => {

      qtyItem = event.target.value;
      if (qtyItem > 100) {
        qtyItem = 100;
        window.alert("La quantité maximale de produits est de 100. Vous ne pouvez pas en avoir plus.");
        event.target.value = 100;

      }
      if (qtyItem < 1) {
        qtyItem = 1;
        window.alert("La quantité minimale de produits est de 1. Vous ne pouvez pas en avoir moins.");
        event.target.value = 1;
      }
      productItem = event.target.closest(".cart__item");
      const kanapCart = changeKanapQty(qtyItem, cartWithPrice, productItem.dataset.id, productItem.dataset.color);

      calculTotalQty(kanapCart);
    });
  });

  // Supprimer les produits au clic sur le bouton supprimer 
  document.querySelectorAll(".deleteItem").forEach((deleteItem) => {
    deleteItem.addEventListener("click", (event) => {
      //Cibler l'élément pour récupérer l'id
      productItem = event.target.closest(".cart__item");
      // Supprimer l'item du localStorage
      const kanapCart = deleteKanap(productItem.dataset.id, cartWithPrice);
      // Supprimer l'item du DOM
      productItem.remove();
      calculTotalQty(kanapCart);
      isCartEmpty(kanapCart);
    });
  });
};


// Fonction créée dans le but de vérifier le formulaire de contact
const verifyForm = () => {

  document.getElementById("order").addEventListener("click", (event) => {
    event.preventDefault();

    // Faire les tests des inputs
    const isValidFirstName = verifyName("firstName", "firstNameErrorMsg", "Prénom");
    const isValidLastName = verifyName("lastName", "lastNameErrorMsg", "Nom");
    const isValidAdress = verifyAddress("address", "addressErrorMsg", "Adresse");
    const isValidCity = verifyCity("city", "cityErrorMsg", "Ville");
    const isValidMail = verifyMail("email", "emailErrorMsg", "Email");
    // Si tous les champs sont bons, alors..
    if (isValidFirstName && isValidLastName && isValidAdress && isValidCity && isValidMail) {
      orderId = "";

      // Création de l'objet contact
      const contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
      }

      // Insertion des produits dans l'objet products en gardant que les id de ceux-ci
      const cart = loadCart();
      const products = [];
      cart.forEach((product) => {
        products.push(product._id);
      });

      // Création de l'objet qui sera envoyé avec la reqûete POST afin de recevoir l'orderId
      const body = {
        contact,
        products
      }

      // Récupération de l'orderId via la promise
      const orderPromise = post('http://localhost:3000/api/products/order', body);
      orderPromise.then((order) => {
        if (order === -1) {
          window.alert("Il y a eu une erreur lors de l'envoi de votre commande, veuillez réessayer plus tard.");
          return;
        } else {
          localStorage.clear();
          window.location.assign(`confirmation.html?orderId=${order.orderId}`);
        }
      })
    }
  })
}
verifyForm();

showCart();
