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
            address: component.get("v.address"),
            layers: component.get("v.kmlLayers")
          }
        }
        helper.sendToVF(component, message);
      }
      if ( event.data.name === "updateRecord" ) {
        let params = { record: event.data.record, address: event.data.address };
        helper.sendToParent(component, params);
      }
    }, false);
  },

  executeResetRecord: function(component, event, helper) {
    let message = {
      name: "resetRecord",
      payload: {
        record: component.get("v.record"),
      }
    }
    helper.sendToVF(component, message);
  },

})
