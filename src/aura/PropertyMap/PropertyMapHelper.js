({

  sendToVF : function(component, message) {
    let vfOrigin = "https://" + component.get("v.vfHost");
    let vfWindow = component.find("vfFrame").getElement().contentWindow;
    vfWindow.postMessage(JSON.stringify(message), vfOrigin);
  },

  sendToParent: function(component) {
    let compEvent = component.getEvent("updateAttributes");
    compEvent.setParams({
      record: component.get("v.record"),
      kmlLayers: component.get("v.kmlLayers")
    });
    compEvent.fire();
  },

})
