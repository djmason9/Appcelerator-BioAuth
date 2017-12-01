/**************************************************************************************************************	
 	You can use Mocx to create a collection and populate a Table or Listview, or create Models on the fly, 
	and it'll support the .fetch() method to pretend to get the model / collection. 
	So you could use it to mock data and even persist data to local storage.
***************************************************************************************************************/
Backbone.sync = function(method, model, options) {
	// overrides fetch() to trigger a bind via change()
	if ( model instanceof Backbone.Collection) {
		console.warn("Collection sync: " + method);
	} else {
		console.warn("model sync: " + method);
	}

	model.trigger("change");
	options.success(model.toJSON());
};

exports.createModel = function(name, attributes) {
	var model = new Backbone.Model(attributes);
	return model;
};

exports.createCollection = function(name, content) {
	if (!Alloy.Collections[name]) {
		Alloy.Collections[name] = new Backbone.Collection();
	}

	if ( content instanceof Array) {
		Alloy.Collections[name].reset(content);
	} else {
		throw "No Array specified for createCollection";
	}
}; 