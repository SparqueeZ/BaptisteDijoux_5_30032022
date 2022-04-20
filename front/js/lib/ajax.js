const get = async (url) => {
    const reponse = await fetch(url);
    if (reponse.ok) {
        return await reponse.json();
    }
    return -1;


    // fetch(url)
    //     .then((result) => {
    //         if (result.ok) {
    //             return result.json();
    //         }
    //     })
    //     .then((items) => {
    //         console.log(items);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
};