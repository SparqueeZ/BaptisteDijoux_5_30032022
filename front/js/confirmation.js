//Insérer l'ID de la commande sur la page HTML
const showOrderIdOnPage = () => {
    //Récupération de l'order ID dans l'URL
    const orderId = new URLSearchParams(window.location.search).get("orderId");
    //Insertion dans l'élément ayant pour ID "orderId"
    document.getElementById('orderId').innerHTML = `<br><br>${orderId}`;
}

//Appel de la fonction
showOrderIdOnPage();