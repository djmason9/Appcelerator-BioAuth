exports.definition = {
    config: {
        columns: {
            "name": "string" ,
            "status" : "string",
            "location" : "string",
            "phone" : "string"
        },
        adapter: {
            type: "properties"
        }
    },
	extendModel: function(Model) {
		_.extend(Model.prototype, {});
		return Model;
	}
};
