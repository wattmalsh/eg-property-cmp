({

  sendToVF : function(component, message) {
    let vfOrigin = "https://" + component.get("v.vfHost");
    let vfWindow = component.find("vfFrame").getElement().contentWindow;
    vfWindow.postMessage(JSON.stringify(message), vfOrigin);
  },

})
