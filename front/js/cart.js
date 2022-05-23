const showCart = async (cart) => {
  const errorMessageEmptyCart =
    "Votre panier est vide, vous allez être redirigé vers la page d'accueil";

  const insideCart = loadCart();
  // console.log(insideCart);
  if (insideCart === null) {
    window.alert(errorMessageEmptyCart);
    window.location.href = "index.html";
    return;
  }
  // console.log(insideCart);

  getItems = document.getElementById("cart__items");
  let insertCartHTML = "";
  let kanapPrice = 0;
  let displayQty = "";
  let testIdReplace = [];

  insideCart.forEach((order) => {
    displayQty = order.qty;
    kanapPrice = 42 * parseInt(order.qty);
    let displayId = [order._id];
    testIdReplace = order._id;

    insertCartHTML += `<article class="cart__item" data-id="${order._id}" data-color="${order.color}">
        <div class="cart__item__img">
                  <img src="${order.imageUrl}" alt="${order.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${order.name}</h2>
                    <p>${order.color}</p>
                    <p>${kanapPrice} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${order.qty}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                      <p> <a class="cart__item__content__description" href="./product.html?id=${order._id}">Aller au produit </a> </p>
                    </div>
                  </div>
                </div>
              </article>
              <div id="${testIdReplace}"><a href="./product.html?id=${order._id}">Salut</a></div>`;
  });

  insideCart.forEach((order) => {
    // console.log(displayQty);
    // console.log(kanapPrice);
    // console.log(testIdReplace);
  });

  getItems.innerHTML = insertCartHTML;

  // Nombre total des articles
  let totalKanapQuantity = 0;
  insideCart.forEach((order) => {
    totalKanapQuantity += order.qty++;
  });

  // Insérer le total sur la page
  insertTotalQuantityHTML = document.getElementById("totalQuantity");
  let kanapNumber = 0 + totalKanapQuantity;
  insertTotalQuantityHTML.innerHTML = kanapNumber;

  //Changer la qté
  document.querySelectorAll(".itemQuantity").forEach((itemQuantity) => {
    itemQuantity.addEventListener("change", () => {
      console.log("Changer la qté");
      console.log("Ancien :", kanapNumber);
      kanapNumber = displayQty;
      console.log("Nouveau :", kanapNumber);
    });
  });

  //Supprimer, Look findIndex et splice

  // A revoir
  console.log(insideCart);
  document.querySelectorAll(".deleteItem").forEach((deleteItem) => {
    deleteItem.addEventListener("click", () => {
      const Salut = insideCart.findIndex(
        (deleteItem) => deleteItem._id === "77711f0e466b4ddf953f677d30b0efc9"
      );
      console.log(Salut);
      console.log(insideCart.slice(2, 4));
    });
  });

  const productList = await get("http://localhost:3000/api/products");
  // console.log(productList);
};

showCart();
