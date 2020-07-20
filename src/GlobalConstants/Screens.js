
let screens = {};

// Home 
screens.HomeScreen = '/';

// Auth
screens.AuthRouter = '/Auth';
screens.SignInScreen = screens.AuthRouter + "/SignIn";
screens.SignUpScreen = screens.AuthRouter + "/SignUp";

// Main
screens.MainRouter = '/Main';

// Main/Timeline
screens.TimelineRouter = screens.MainRouter + '/Timeline';
screens.TimelineScreen = screens.TimelineRouter + '/';

// Main/Settings
screens.SettingsRouter = screens.MainRouter + '/Settings';
screens.SettingsScreen = screens.SettingsRouter + '/';

// Main/Rooms
screens.RoomsRouter = screens.MainRouter + '/Rooms';
screens.RoomsScreen = screens.RoomsRouter + '/';

screens.RoomDetails = screens.RoomsRouter + '/RoomDetails/:roomId';
screens.goToRoomDetails = (roomId)=> screens.RoomsRouter + `/RoomDetails/${roomId}`;

screens.RoomSettings = screens.RoomsRouter + '/RoomSettings/:roomId';
screens.goToRoomSettings = (roomId)=> screens.RoomsRouter + `/RoomSettings/${roomId}`;


module.exports = screens;