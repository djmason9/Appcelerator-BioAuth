exports.definition = {
	config: {
		URL: "http://192.168.1.16:8080/api/UserStats",
		adapter: {
			type: "restapi",
			collection_name: "userModel",
			idAttribute: "id"
		},
		headers: {
            "Authorization": 'Basic ' + 
            Ti.Utils.base64encode('yH6GxeM9I3ctGmTY7OfZXbDsGFEXFtwl:'),
        },
        parentNode: function(data) {
            data = data || [];
            return data.userstats || data;
        }
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {			
		});
		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
		});
		return Collection;
	}
};

