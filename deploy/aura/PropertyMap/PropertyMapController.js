({

  doInit : function(component, event, helper) {
    let vfOrigin = "https://" + component.get("v.vfHost");
    window.addEventListener("message", function(event) {
      if (event.origin !== vfOrigin) {
        // Not the expected origin: reject message
        return;
      }
      // Only handle messages we are interested in
      if (event.data === "init") {
        helper.sendToVF(component, event, helper);
      }
      if ( event.data.name === "marker dragend" ) {
        // component.set("v.record", event.data.record);
        // helper.sendToVF(component);
      }
    }, false);
  }

})
