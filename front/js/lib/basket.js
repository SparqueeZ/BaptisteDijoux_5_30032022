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
      qty: productQty,
    };
    cart.push(orderKanap);
  } else {
    kanapFind.qty = parseInt(kanapFind.qty) + parseInt(productQty);
  }

  saveCart(cart);
};
