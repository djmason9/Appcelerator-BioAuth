var wasShown = false,
    tiUserList = {};

(function main() {
	// Hide nav bar
	if (OS_IOS) {
		$.userList.hideNavBar(true, {
			animated : false
		});
	}

	Alloy.Collections.userModel.fetch();

	tiUserList.createNewUser = function() {
		if ($.name.value) {

			var model = Alloy.createModel("userModel");
			//could also add this in the XML as <Model src="tasks"/> to create instance
			// then you would accessess it like var model = Alloy.Models.tasks;

			// saves it to the collection triggers a change event calls backbone sync to cloud for create
			model.save({
				"name" : $.name.value,
				"phone" : $.phone.value,
				"location" : $.loc.value,
				"status" : $.status.value.toLowerCase()
			}, {
				success : function() {
					Alloy.Collections.userModel.add(model);
				}
			});

			//clear dataa
			$.name.value = "";
			$.phone.value = "";
			$.loc.value = "";
			$.status.value = "";

		} else {
			alert("Enter a name!");
		}
	};

	tiUserList.showHideCreate = function(isShown) {

		var t = isShown ? 0 : "100%";

		var animation = Ti.UI.createAnimation({
			top : t,
			duration : 400
		});

		$.createNewModal.animate(animation);

		wasShown = isShown;
	};

	/**
	 * simple way to drop the keyboard
	 */
	tiUserList.hideSoftKeyboard = function() {
		if (OS_ANDROID) {
			Ti.UI.Android.hideSoftKeyboard();
		} else {
			$.name.focus();
			$.name.blur();
		}
	};

	tiUserList.doUserDetail = function(e) {

		var json = Alloy.Collections.userModel.at(e.itemIndex).toJSON();

		//Used for real buttons
		if (OS_IOS) {
			Alloy.Globals.pushViewOnController("userDetails", {
				"name" : json.name,
				"status" : json.status,
				"phone" : json.phone,
				"location" : json.location
			});
		} else {
			var win1 = Alloy.createController("userDetails", {
				"name" : json.name,
				"status" : json.status,
				"phone" : json.phone,
				"location" : json.location
			}).getView();
			win1.open();
		}

	};

})();

/***
 * Opens window to the user details
 * @param {Object} e
 */
function userDetail(e) {
	tiUserList.doUserDetail(e);
}

/***
 * Opens the create user view
 * @param {Object} e
 */
function showHide(e) {
	//show new user form
	tiUserList.showHideCreate(!wasShown);
	//quick way to drop the keyboard
	tiUserList.hideSoftKeyboard();
}

/**
 * Calls private function to create a new user in our model via the API
 * @param {Object} e
 */
function doCreate(e) {
	tiUserList.createNewUser();
	showHide();
}

