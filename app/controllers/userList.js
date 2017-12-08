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

	var opts = {
		$model : Alloy.Collections.userModel.at(e.itemIndex)
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

