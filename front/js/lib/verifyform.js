const verifyName = (itemName, itemNameErrorMessage, infoName,) => {

    let value = document.getElementById(itemName).value;
    const itemError = document.getElementById(itemNameErrorMessage);
    itemError.innerHTML = "";
    // Enlever les espaces devant et derriere
    value = value.trim();

    if (value.length < 1) {
        itemError.innerHTML = `Le champ "${infoName}" ne peut pas être vide.`;
        return false;
    }

    const regex = /^[a-zA-ZàâéèêçÂÊÇÉÈ\-\ \']+$/;
    if (regex.test(value) === false) {
        itemError.innerHTML = `Le champ "${infoName}" ne doit pas contenir de caractères spéciaux ou de nombres.`;
        return false;
    }
    return true;
}

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
        itemError.innerHTML = `Le champ "${infoName}" ne doit pas contenir de caractères spéciaux ou de nombres.`;
        return false;
    }
    return true;
}

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
        itemError.innerHTML = `Le champ "${infoName}" ne doit pas contenir de caractères spéciaux ou de nombres.`;
        return false;
    }
    return true;
}

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
        itemError.innerHTML = `Le champ "${infoName}" doit correspondre à une adresse mail.`;
        return false;
    }
    return true;
}