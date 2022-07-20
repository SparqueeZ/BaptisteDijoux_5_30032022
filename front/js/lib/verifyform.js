// Document verifyform.js : Library créée dans le but d'éviter de surcharger le code dans le document "cart.js".

// Vérification des noms (nom courant et nom de famille)
const verifyName = (itemName, itemNameErrorMessage, infoName,) => {

    // Récupération de la valeure entrée dans la page
    let value = document.getElementById(itemName).value;
    // Récupération de l'ID permettant l'affichage du message d'erreur
    const itemError = document.getElementById(itemNameErrorMessage);
    // Remise à zéro du message d'erreur au clic sur le bouton submt
    itemError.innerHTML = "";
    // Enlever les espaces devant et derriere la valeur entrée
    value = value.trim();

    // Si le champ est vide, il n'est pas valide
    if (value.length < 1) {
        itemError.innerHTML = `Le champ "${infoName}" ne peut pas être vide. Exemple : Jean`;
        return false;
    }

    // Si le champ ne rempli pas les caractéristiques requises par les regex, il n'est pas valide
    const regex = /^[a-zA-ZàâéèêçÂÊÇÉÈ\-\ \']+$/;
    if (regex.test(value) === false) {
        itemError.innerHTML = `Le champ "${infoName}" ne doit pas contenir de caractères spéciaux ou de nombres. Exemple : Payet`;
        return false;
    }
    //Retourne true si le champ ne contient aucune des erreurs vérifiés ci dessus
    return true;
}

// Vérification de l'adresse 
const verifyAddress = (itemName, itemNameErrorMessage, infoName) => {
    const value = document.getElementById(itemName).value;
    const itemError = document.getElementById(itemNameErrorMessage);
    itemError.innerHTML = "";

    if (value.length < 1) {
        itemError.innerHTML = `Le champ "${infoName}" ne peut pas être vide.`;
        return false;
    }

    const regex = /^[0-9][a-zA-ZàâéèêçÂÊÇÉÈ\-\ \']+$/;
    if (regex.test(value) === false) {
        itemError.innerHTML = `Le champ "${infoName}" doit être au format d'une adresse postale. Exemple : 2bis Chemin Burbata`;
        return false;
    }
    return true;
}

// Vérification de la ville
const verifyCity = (itemName, itemNameErrorMessage, infoName) => {
    const value = document.getElementById(itemName).value;
    const itemError = document.getElementById(itemNameErrorMessage);
    itemError.innerHTML = "";

    if (value.length < 1) {
        itemError.innerHTML = `Le champ "${infoName}" ne peut pas être vide.`;
        return false;
    }

    const regex = /^[a-zA-ZàâéèêçÂÊÇÉÈ\-\ \']+$/;
    if (regex.test(value) === false) {
        itemError.innerHTML = `Le champ "${infoName}" ne doit pas contenir de caractères spéciaux ou de nombres. Exemple : Le Tampon`;
        return false;
    }
    return true;
}

// Vérification de l'adresse mail
const verifyMail = (itemName, itemNameErrorMessage, infoName) => {
    const value = document.getElementById(itemName).value;
    const itemError = document.getElementById(itemNameErrorMessage);
    itemError.innerHTML = "";

    if (value.length < 1) {
        itemError.innerHTML = `Le champ "${infoName}" ne peut pas être vide.`;
        return false;
    }

    const regex = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    if (regex.test(value) === false) {
        itemError.innerHTML = `Le champ "${infoName}" doit correspondre à une adresse mail. Exemple : exemple@gmail.com`;
        return false;
    }
    return true;
}