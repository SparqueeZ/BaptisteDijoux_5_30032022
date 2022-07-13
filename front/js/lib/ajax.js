// Document ajax.js : Library créée dans le but de centraliser les méthodes de fetch afin de ne pas sucharger les informations envoyer au serveur.

// Fetch utilisant la méthode GET afin d'obtenir toutes les informations sur les produits
const get = async (url) => {
    const reponse = await fetch(url);
    if (reponse.ok) {
        return await reponse.json();
    }
    return -1;
};

// Fetch utilisant la méthode POST afin d'obtenir l'orderId grâce a l'envoi des informations nécessaires (infos de contact et infos de la commande) au serveur
const post = async (url, body) => {
    const reponse = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    });
    if (reponse.status === 201) {
        return await reponse.json();
    }
    return -1;
};