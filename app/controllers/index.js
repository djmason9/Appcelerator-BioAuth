var TouchId = require("ti.touchid"),
    TiAuth = {};

//These could be pulled from keychain http://docs.appcelerator.com/platform/latest/#!/api/Modules.TouchId.KeychainItem
var userName = "admin",
    password = "pass";

//constructor
(function main() {

	if (OS_IOS) {

		if (TouchId.isSupported()) {
			$.thumbprintBtn.setVisible(true);
		}
	}

	TiAuth.doBioAuth = function() {
		if (OS_IOS && TouchId.isSupported()) {
			TouchId.authenticate({
				reason : "Login to this application",
				allowableReuseDuration : 2, // iOS 9+, optional, in seconds, only used for lockscreen-unlocks
				fallbackTitle : "Use different auth method?", // iOS 10+, optional
				cancelTitle : "No thanks", // iOS 10+, optional
				callback : function(e) {
					if (!e.success) {
						switch(e.code) {
						case TouchId.ERROR_AUTHENTICATION_FAILED:
							Ti.API.info('Error code is TouchId.ERROR_AUTHENTICATION_FAILED');
							break;
						case TouchId.ERROR_USER_CANCEL:
							Ti.API.info('Error code is TouchId.ERROR_USER_CANCEL');
							break;
						case TouchId.ERROR_USER_FALLBACK:
							Ti.API.info('Error code is TouchId.ERROR_USER_FALLBACK');
							break;
						case TouchId.ERROR_SYSTEM_CANCEL:
							Ti.API.info('Error code is TouchId.ERROR_SYSTEM_CANCEL');
							break;
						case TouchId.ERROR_PASSCODE_NOT_SET:
							Ti.API.info('Error code is TouchId.ERROR_PASSCODE_NOT_SET');
							break;
						case TouchId.ERROR_TOUCH_ID_NOT_AVAILABLE:
							Ti.API.info('Error code is TouchId.ERROR_TOUCH_ID_NOT_AVAILABLE');
							break;
						case TouchId.ERROR_TOUCH_ID_NOT_ENROLLED:
							Ti.API.info('Error code is TouchId.ERROR_TOUCH_ID_NOT_ENROLLED');
							break;
						case TouchId.ERROR_TOUCH_ID_NOT_ENROLLED:
							Ti.API.info('Error code is TouchId.ERROR_TOUCH_ID_NOT_ENROLLED');
							break;
						case TouchId.ERROR_APP_CANCELLED:
							Ti.API.info('Error code is TouchId.ERROR_APP_CANCELLED');
							break;
						case TouchId.ERROR_INVALID_CONTEXT:
							Ti.API.info('Error code is TouchId.ERROR_INVALID_CONTEXT');
							break;
						case TouchId.ERROR_TOUCH_ID_LOCKOUT:
							Ti.API.info('Error code is TouchId.ERROR_TOUCH_ID_LOCKOUT');
							break;
						default:
							Ti.API.info('Error code is unknown');
							break;
						}
					} else {//success
						TiAuth.doAuth(true);
					}
				}
			});
		}
	};

	TiAuth.doAuth = function(didPassBio) {
		if (password == $.passWrdTxt.value && userName == $.userNmTxt.value || didPassBio) {		
    
			var win1 = Alloy.createController("userList").getView();	//android 
			var opt = {};
			
	        if (OS_IOS) {
	        	win1 = Alloy.createController("userListNav").getView();	 //ios
	            opt = {
	                transition : Ti.UI.iOS.AnimationStyle.FLIP_FROM_LEFT,
	                duration : 500
	            };
	        } 
	        
	        win1.open(opt);
        
		} else {
			alert("You have failed to login!");
		}

	};

	$.login.open();

})();

function thumbPrint(e) {
	TiAuth.doBioAuth();
}

function authenticate(e) {
	TiAuth.doAuth();
}

