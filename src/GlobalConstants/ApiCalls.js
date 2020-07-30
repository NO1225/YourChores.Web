export async function post(apiRoute, body) {
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

export async function authPost(apiRoute, body) {
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


export async function get(apiRoute, body) {
    try {
        var res = await fetch(apiRoute)

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

export async function authGet(apiRoute, body) {
    try {
        var token = localStorage.getItem("TOKEN");

        var res = await fetch(apiRoute, {
            method: "get",
            headers: new Headers({
                "Authorization": `Bearer ${token}`
            })
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


