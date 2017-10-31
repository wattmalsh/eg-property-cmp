({

  sendToVF : function(component, message) {
    let vfOrigin = "https://" + component.get("v.vfHost");
    let vfWindow = component.find("vfFrame").getElement().contentWindow;
    vfWindow.postMessage(JSON.stringify(message), vfOrigin);
  },

  sendToParent: function(component, record) {
    let compEvent = component.getEvent("updateRecord");
    compEvent.setParams(record);
    compEvent.fire();
  },

})
