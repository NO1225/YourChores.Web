const API_URL = "http://yourchores.me/"

exports.apiRoutes ={
    SignUp : API_URL + `api/Auth/Register`,
    SignIn : API_URL + `api/Auth/Login`,
    TokenLogin: API_URL + `api/Auth/TokenLogin`,
}