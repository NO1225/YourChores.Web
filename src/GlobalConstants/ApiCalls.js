exports.post = async (apiRoute, body) => {
    try {
        var res = await fetch(apiRoute, {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(body)
        })

        var data = await res.json();

        return data;
    }
    catch (err) {
        console.log(err);
        var data = {};
        data.success = false;
        return data;
    }
}

exports.authPost = async (apiRoute, body) => {
    try {
        var token = localStorage.getItem("TOKEN");

        var res = await fetch(apiRoute, {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }),
            body: JSON.stringify(body)
        })

        var data = await res.json();

        return data;
    }
    catch (err) {
        console.log(err);
        var data = {};
        data.success = false;
        return data;
    }
}


