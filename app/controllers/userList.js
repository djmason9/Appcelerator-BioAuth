var wasShown = false,
    tiUserList = {};

(function main() {

	//reload data each time
	$.userList.addEventListener('focus', function() {	
		Alloy.Collections.userModel.fetch();
	});
	// Hide nav bar
	if (OS_IOS) {
		$.userList.hideNavBar(true, {
			animated : false
		});
	}

	tiUserList.createNewUser = function() {
		if ($.name.value) {

			var model = Alloy.createModel("userModel");

			// saves it to the collection triggers a change event calls backbone sync to cloud for create
			model.save({
				"name" : $.name.value,
				"phone" : $.phone.value,
				"location" : $.loc.value,
				"status" : $.status.value.toLowerCase()
			}, {
				success : function(model, response, options) {		
					Alloy.Collections.userModel.fetch();//update model with latest ids
				}
			});

			//clear data
			$.name.value = "";
			$.phone.value = "";
			$.loc.value = "";
			$.status.value = "";

			showHide();
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
	};
	
	//Listen for deletes
	$.userListView.addEventListener("delete", function(e) {
 
        var m = Alloy.Collections.userModel.at(e.itemIndex);
        m.destroy({
        	wait:true,
        	success : function(){
        		alert("User removed!");
        	},error: function(){
        		alert("There was a problem removing user.");
        	}
        }); //delete user from API

    });

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
}


