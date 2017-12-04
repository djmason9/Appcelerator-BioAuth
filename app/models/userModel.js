exports.definition = {
	config: {
		adapter: {
			type: "sql", // <-- name of custom adapter
			collection_name: "userModel"
		},
		// Gets the parent node of our Array
        parentNode: function(data) {
            data = data || [];
            return data.UserStats || data;
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