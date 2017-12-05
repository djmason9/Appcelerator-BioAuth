(function main() {
	
	Alloy.Models.details.destroy();
	
	Alloy.Models.details.save({
        "name" : $.args.name,
        "status" : $.args.status,
        "location" : $.args.location,
        "phone" : $.args.phone
    }, {
        success : function(model, response, options) {
            console.log("saved");
        }
    }, {
        error : function(model, response, options) {
            console.log("fail");
        }
    });
	
})();
