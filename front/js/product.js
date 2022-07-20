// Fonction créée dans le but de mettre en page le produit
const showProductInfos = async () => {
  const alertMessageNoId =
    "Vous n'avez pas choisi de produit, veuillez en choisir un à la page d'acceuil";
  const alertMessageWrongId =
    "Le produit sélectionné n'existe pas, veuillez en choisir un autre à la page d'acceuil";
  const alertMessageWrongNumber =
    "Vous devez sélectionner au moins 1 produit, et le nombre maximum de produits est 100";
  const alertMessageNoColor =
    "Vous devez sélectionner une couleur pour le produit sélectionné";

  const idProduct = new URLSearchParams(window.location.search).get("id");

  if (idProduct === null || idProduct === '') {
    window.alert(alertMessageNoId);
    window.location.href = "index.html";
    return;
  }

  const product = await get(`http://localhost:3000/api/products/${idProduct}`);
  if (product === -1) {
    window.alert(alertMessageWrongId);
    window.location.href = "index.html";
    return;
  }

  // Changer le title de la page afin de correspondre au nom du produit
  document.querySelector('title').textContent = `${product.name}`;

  //Intégrer les images
  document.getElementsByClassName(
    "item__img"
  )[0].innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  //Intégrer les noms
  document.getElementById("title").innerHTML = `${product.name}`;
  //Intégrer les prix
  document.getElementById("price").innerHTML = `${product.price}`;
  //Intégrer les descriptions
  document.getElementById("description").innerHTML = `${product.description}`;

  //Intégrer les couleurs
  let colorsHTML = "";
  product.colors.forEach((color) => {
    colorsHTML += `<option value="${color}">${color}</option>`;
  });
  // Insérer après le choix par défaut
  document.getElementById("colors").insertAdjacentHTML("beforeend", colorsHTML);

  //Ajouter un événement click sur le bouton.
  document.getElementById("addToCart").addEventListener("click", () => {
    //Vérifier le nombre d'articles
    let articleNumber = document.getElementById("quantity").value;
    if (articleNumber < 1 || articleNumber > 100) {
      window.alert(alertMessageWrongNumber);
      return;
    }

    //Vérifier les couleurs
    let articleColor = document.getElementById("colors").value;
    if (articleColor === "") {
      window.alert(alertMessageNoColor);
      return;
    }

    // Fin : Ajout au localStorage et redirection vers la page panier
    addToBasket(product, articleColor, articleNumber);
    window.location.href = 'cart.html';
  });
};

showProductInfos();