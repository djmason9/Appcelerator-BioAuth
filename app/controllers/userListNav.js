

// Makes this global so I can access
Alloy.Globals.pushViewOnController = function(viewName,opts) { 
    // console.log(view);     
    $.getView().openWindow(Alloy.createController(viewName,opts).getView());
};

