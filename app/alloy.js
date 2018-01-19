/* Image path and density examples

/images/image.png	100×100
/images/iphone/image@2x.png	200×200
/images/iphone/image@3x.png	300×300
/images/android/res-hdpi/image.png	150×150
/images/android/res-xhdpi/image.png	200×200
/images/android/res-xxhdpi/image.png	300×300

*/
var mocx = require("mocx");

Alloy.Globals.isIphoneX = (Ti.Platform.displayCaps.platformHeight == 812);

(function constructor(){

// Create Mock Users from fake data
var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,'mockData/users.json');
	preparse = file.read().text,
	response = JSON.parse(preparse);
    
	mocx.createCollection("userModel", response.userstats);
})();
