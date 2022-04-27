const showProductInfos = async () => {

    const getURL = window.location.href;

    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('id')) {
        let id = searchParams.get('id');
        console.log(id)
    }
    else {
        window.alert("Vous n'avez pas choisi de produit, veuillez en choisir un à la page d'acceuil");
        document.location.href = "file:///C:/Users/bapti/Documents/OpenClassRooms/P5/front/html/index.html";
    }


}


showProductInfos();