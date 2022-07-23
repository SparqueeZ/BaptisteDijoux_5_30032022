// Document basket.js : Library créée dans le but de simplifier le chargement et la sauvegarde du panier afin de ne pas impacter les perforamances serveur

// Charger le panier
const loadCart = () => {
  return JSON.parse(localStorage.getItem("panierKanap")) || [];
};

// Sauvegarder le panier
const saveCart = (recievedCart) => {
  localStorage.setItem("panierKanap", JSON.stringify(recievedCart));
};

// Fonction lancée lors du clic afin d'ajouter au panier la commande créée
const addToBasket = (product, productColor, productQty) => {

  const alertMessageTooMuchKanapInCart =
    "Il est impossible d'avoir plus de 100 articles";

  const cart = loadCart();

  const kanapFind = cart.find(
    (kanapCart) =>
      kanapCart._id === product._id && kanapCart.color === productColor
  );

  if (kanapFind === undefined) {
    kanapTotalQty = productQty;
  } else {
    kanapTotalQty = parseInt(kanapFind.qty) + parseInt(productQty);
    if (kanapTotalQty > 100) {
      window.alert(alertMessageTooMuchKanapInCart);
      kanapTotalQty -= productQty;
      return;
    }
  }

  if (kanapFind === undefined) {
    const orderKanap = {
      _id: product._id,
      altTxt: product.altTxt,
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      color: productColor,
      qty: parseInt(productQty),
    };
    cart.push(orderKanap);
  } else {
    kanapFind.qty = parseInt(kanapFind.qty) + parseInt(productQty);
  }

  saveCart(cart);
};

// Fonction lancée lors du clic afin de supprimer du panier le produit selectionné
const deleteKanap = (productId, cartWithPrice) => {

  const cart = loadCart();

  const indexOfDeletedKanap = cart.findIndex(
    (deleteItem) => deleteItem._id === productId
  );

  cart.splice(indexOfDeletedKanap, 1);

  saveCart(cart);

  const indexOfDeletedKanapWithPrice = cartWithPrice.findIndex(
    (deleteItem) => deleteItem._id === productId
  );

  cartWithPrice.splice(indexOfDeletedKanapWithPrice, 1);

  return cartWithPrice;
};

// Fonction lancée lors du clic afin de recalculé le prix total du panier
const calculTotalQty = (cartWithPrice) => {

  //Calculer le total
  let totalKanapQuantity = 0;
  let totalKanapPrice = 0;
  cartWithPrice.forEach((order) => {
    totalKanapQuantity += order.qty;
    totalKanapPrice += order.price * order.qty;
  });
  //Insérer le total Articles
  const kanapTotalNumber = 0 + totalKanapQuantity;
  document.getElementById("totalQuantity").innerHTML = kanapTotalNumber;
  //Insérer le total Prix
  const kanapTotalPrice = 0 + totalKanapPrice;
  document.getElementById("totalPrice").innerHTML = kanapTotalPrice;
};

// Fonction lancée lors du clic afin de changer dynamiquement le nombre de produits
const changeKanapQty = (qtyItem, cartWithPrice, productId, productColor) => {
  const cart = loadCart();

  console.log(cart);
  const indexOfQtyKanap = cart.findIndex(
    (changeQtyItem) => changeQtyItem._id === productId && changeQtyItem.color === productColor
  );

  kanapToChange = cartWithPrice[indexOfQtyKanap];
  kanapToChange.qty = parseInt(qtyItem);

  const newKanapQty = {
    _id: kanapToChange._id,
    altTxt: kanapToChange.altTxt,
    name: kanapToChange.name,
    description: kanapToChange.description,
    imageUrl: kanapToChange.imageUrl,
    color: kanapToChange.color,
    qty: parseInt(qtyItem),
  };

  cart.splice(indexOfQtyKanap, 1, newKanapQty)

  saveCart(cart);

  const indexOfQtyKanapWithPrice = cartWithPrice.findIndex(
    (changeQtyItem) => changeQtyItem._id === productId && changeQtyItem.color === productColor
  );

  const newKanapQtyWithPrice = {
    _id: kanapToChange._id,
    altTxt: kanapToChange.altTxt,
    name: kanapToChange.name,
    description: kanapToChange.description,
    imageUrl: kanapToChange.imageUrl,
    color: kanapToChange.color,
    qty: parseInt(qtyItem),
    price: kanapToChange.price
  };

  cartWithPrice.splice(indexOfQtyKanapWithPrice, 1, newKanapQtyWithPrice)

  return cartWithPrice;
};