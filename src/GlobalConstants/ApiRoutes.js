const API_URL = "http://yourchores.me/"

exports.apiRoutes ={
    SignUp : API_URL + `api/Auth/Register`,
    SignIn : API_URL + `api/Auth/Login`,
    TokenLogin: API_URL + `api/Auth/TokenLogin`,
    GetMyInfo: API_URL + `api/Auth/GetMyInfo`,
    ChangeName: API_URL + `api/Auth/ChangeName`,
    ChangePassward: API_URL + `api/Auth/ChangePassward`,
}