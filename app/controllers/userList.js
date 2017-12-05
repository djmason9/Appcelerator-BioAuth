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

	//Used for real buttons
	if (OS_IOS) {
		Alloy.Globals.pushViewOnController("userDetails", {
			"name" : json.name,
			"status" : json.status
		});
	} else {
		var win1 = Alloy.createController("userDetails", {
			"name" : json.name,
			"status" : json.status
		}).getView();
		win1.open();
	}
}

