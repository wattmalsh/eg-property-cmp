({

  doInit: function(component, event, helper) {
    let vfOrigin = "https://" + component.get("v.vfHost");
    window.addEventListener("message", function(event) {
      if (event.origin !== vfOrigin) {
        // Not the expected origin: reject message
        return;
      }
      // Only handle messages we are interested in
      if (event.data === "init") {
        let message = {
          name: "initResponse",
          payload: {
            record: component.get("v.record"),
            layers: component.get("v.kmlLayers")
          }
        }
        helper.sendToVF(component, message);
        helper.sendToParent(component);
      }
      if ( event.data.name === "marker dragend" ) {
        component.set("v.record", event.data.record);
        helper.sendToParent(component);
      }
    }, false);
  },

})
