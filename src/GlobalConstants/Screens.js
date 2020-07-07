
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

module.exports = screens;