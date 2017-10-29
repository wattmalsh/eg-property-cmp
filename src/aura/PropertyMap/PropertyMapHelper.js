({

  sendToVF : function(component, message) {
    let vfOrigin = "https://" + component.get("v.vfHost");
    let vfWindow = component.find("vfFrame").getElement().contentWindow;
    vfWindow.postMessage(JSON.stringify(message), vfOrigin);
  },

  sendToParent: function(component, params) {
    let compEvent = component.getEvent("updateAttributes");
    compEvent.setParams(params);
    compEvent.fire();
  },

})
