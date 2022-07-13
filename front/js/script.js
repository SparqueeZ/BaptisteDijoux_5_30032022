// Fonction créée dans le but d'afficher tous les produits sur la page d'accueil en utilisant la boucle "forEach"
const showListProduct = async () => {
    const productList = await get('http://localhost:3000/api/products');

    const getItems = document.getElementById('items');
    let productHTML = '';
    productList.forEach(product => {
        productHTML += `<a href="./product.html?id=${product._id}">
            <article>
               <h3 class="productName" >${product.name} </h3>
                 <img src="${product.imageUrl}" alt="${product.altTxt}">
                 <p class="productDescription">${product.description}</p>  
             </article>`
    });

    getItems.innerHTML = productHTML;
};



showListProduct();

