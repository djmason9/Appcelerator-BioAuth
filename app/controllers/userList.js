(function main() {
	// Hide nav bar
	if (OS_IOS) {
		$.userList.hideNavBar(true, {
			animated : false
		});
	}

	Alloy.Collections.userModel.fetch();
})();

function userDetail(e) {

	var json = Alloy.Collections.userModel.at(e.itemIndex).toJSON();
	var opts = {
		"id" : json.id,
		"name" : json.name,
		"status" : json.status,
		"phone" : json.phone,
		"location" : json.location
	},
	controllerNm = "userDetails";

	//Used for real buttons
	if (OS_IOS) {
		Alloy.Globals.pushViewOnController(controllerNm, opts);
	} else {
		var win1 = Alloy.createController(controllerNm, opts).getView();
		win1.open();
	}
}

