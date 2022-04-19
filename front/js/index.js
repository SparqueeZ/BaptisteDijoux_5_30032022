fetch('http://localhost:3000/api/products')
    .then(function (result) {
        if (result.ok) {
            return result.json();
        }
    })
    .then(function (items) {
        console.log(items);
    })
    .catch(function (err) {

    });