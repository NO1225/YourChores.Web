const API_URL = "http://yourchores.me/"

exports.apiRoutes ={
    SignUp : API_URL + `api/Auth/Register`,
    SignIn : API_URL + `api/Auth/Login`,
    TokenLogin: API_URL + `api/Auth/TokenLogin`,
    GetMyInfo: API_URL + `api/Auth/GetMyInfo`,
    ChangeName: API_URL + `api/Auth/ChangeName`,
    ChangePassward: API_URL + `api/Auth/ChangePassward`,

    GetMyRooms : API_URL + `api/Rooms`,
    CreateRoom : API_URL + `api/Rooms`,
    GetRoomById : (roomId) => API_URL + `api/Rooms/getRoomById/${roomId}`,
    UpdateRoom: API_URL + `api/Rooms/Update`,

    DemoteOwner: API_URL + `api/Rooms/Demote`,
    PromoteMember: API_URL + `api/Rooms/Promote`,
    KickMember: API_URL + `api/Rooms/Kick`,

    AcceptRequest: API_URL + `api/Rooms/AcceptRequest`,
    CancelInvitaion: API_URL + `api/Rooms/CancelInvitaion`,
    DeclineRequest: API_URL + `api/Rooms/DeclineRequest`,

    UpdateChore : API_URL + `api/Chores/Update`,
    CreateChore : API_URL + `api/Chores`,
    
}