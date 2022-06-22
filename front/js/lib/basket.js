const loadCart = () => {
  return JSON.parse(localStorage.getItem("panierKanap")) || [];
};

const saveCart = (recievedCart) => {
  localStorage.setItem("panierKanap", JSON.stringify(recievedCart));
};

const addToBasket = (product, productColor, productQty) => {
  // Produit, qtté et color

  const alertMessageTooMuchKanapInCart =
    "Il est impossible d'avoir plus de 100 articles";

  const cart = loadCart();

  const kanapFind = cart.find(
    (kanapCart) =>
      kanapCart._id === product._id && kanapCart.color === productColor
  );

  //Tester la qté product.qty + kanapFind.qty if < 1 ou > 100 aucune modif,

  if (kanapFind === undefined) {
    kanapTotalQty = productQty;
  } else {
    kanapTotalQty = parseInt(kanapFind.qty) + parseInt(productQty);
    if (kanapTotalQty > 100) {
      window.alert(alertMessageTooMuchKanapInCart);
      kanapTotalQty -= productQty;
      console.log(kanapTotalQty);
      return;
    }
  }

  // Ajouter au panier

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

//Modifier la qty
const changeKanapQty = (qtyItem, cartWithPrice, productId) => {
  const cart = loadCart();

  const indexOfQtyKanap = cart.findIndex(
    (changeQtyItem) => changeQtyItem._id === productId
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
    (changeQtyItem) => changeQtyItem._id === productId
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