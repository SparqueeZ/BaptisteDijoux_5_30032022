const showProductInfos = async () => {

    const alertMessageNoId = "Vous n'avez pas choisi de produit, veuillez en choisir un à la page d'acceuil";
    const alertMessageWrongId = "Le produit sélectionné n'existe pas, veuillez en choisir un autre à la page d'acceuil";
    const alertMessageWrongNumber = "Vous devez sélectionner au moins 1 produit"
    const homeLink = "file:/C:/Users/bapti/Documents/OpenClassRooms/P5/front/html/index.html";

    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has('id')) {
        // ERREUR : Non fonctionnel
        if (searchParams.has('id' && 'undefined')) {
            window.alert(alertMessageWrongId);
            document.location.href = homeLink;
        }

        else {
            let idProduct = searchParams.get('id');
            console.log("id du produit = " + idProduct);

            const product = await get('http://localhost:3000/api/products' + '/' + idProduct);

            //Intégrer les images
            document.getElementsByClassName('item__img')[0].innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
            //Intégrer les noms
            document.getElementById('title').innerHTML = `${product.name}`;
            //Intégrer les prix
            document.getElementById('price').innerHTML = `${product.price}`;
            //Intégrer les descriptions
            document.getElementById('description').innerHTML = `${product.description}`;

            //Intégrer les couleurs (ERREUR : Une couleur est mise par défaut, hors par défaut ça doit être : --SVP ...)
            let colorsHTML = '';
            product.colors.forEach(color => {
                colorsHTML += `<option value="${color}">${color}</option>`
                document.getElementById('colors').innerHTML = colorsHTML;
            });

            //Ajouter un événement click sur le bouton. ERREUR : Toutes les infos ne sont pas dans un array 
            document.getElementById('addToCart').addEventListener("click", () => {
                let articleNumber = document.getElementById('quantity').value;
                if (articleNumber >= 1 && articleNumber <= 100) {
                    console.log(product);
                    console.log(articleNumber);
                    console.log(colorsHTML.value);

                }
                else {
                    window.alert(alertMessageWrongNumber);
                }
            });
        }


    }
    else {
        window.alert(alertMessageNoId);
        document.location.href = homeLink;
    }

}

showProductInfos();