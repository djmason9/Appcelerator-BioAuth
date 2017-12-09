(function main() {
	//global way of accessing model
	Alloy.Models.userModel.clear();
	Alloy.Models.userModel.set($model.toJSON());	
})();

function startUpdate() {
	// show edit view
	if ($.infoView.visible) {
		$.editView.setVisible(true);
		$.infoView.setVisible(false);
	} else {
		
		var opts = {
			"id" : $model.toJSON().id,
			"name" : $.nameTxt.value,
			"phone" : $.phoneTxt.value,
			"location" : $.locTxt.value,
			"status" : $.statusTxt.value.toLowerCase()
		};
		
		// saves it to the collection triggers a change event calls backbone sync to cloud for create
		Alloy.Models.userModel.save(opts, {
			success : function() {
				Alloy.Collections.userModel.add(Alloy.Models.userModel); //set updated model back into collection
				$.editView.setVisible(false);
				$.infoView.setVisible(true);										
			}
		});
	}
}
