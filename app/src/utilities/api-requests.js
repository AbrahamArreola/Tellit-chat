export const postRequest = (route, reqData) => {
    const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqData)
    };

    return new Promise((resolve, reject) => {
        fetch(route, config)
            .then(response => {
                return response.json();
            })
            .then(resData => {
                resolve(resData);
            })
            .catch(err => {
                reject(err);
            })
    });
}