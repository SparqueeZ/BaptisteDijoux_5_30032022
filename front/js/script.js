const showListProduct = async () => {
    const productList = await get('http://localhost:3000/api/products');
    productList.forEach(product => {
        console.log(product);
        document.getElementById('items')
            .innerHTML = productList.map((product) => `<a href="./product.html?id=${product._id}">
            <article>
                <h3 class="productName" >${product.name} </h3>
                <img src="${product.imageUrl}" alt="${product.altTxt}">
                <p class="productDescription">${product.description}</p>  
            </article>`)
    });
    console.log(productList);

};


showListProduct();


