const get = async (url) => {
    const reponse = await fetch(url);
    if (reponse.ok) {
        return await reponse.json();
    }
    return -1;
};

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