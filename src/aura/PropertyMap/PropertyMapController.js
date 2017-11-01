({

  doInit: function(component, event, helper) {
    component.set("v.lcHost", window.location.hostname);
    component.set("v.vfHost", window.location.hostname.split(".")[0]);

    window.addEventListener("message", function(event) {
      if ( !event.origin.match("https://" + component.get("v.vfHost")) ) {
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
            layers: component.get("v.layers")
          }
        }
        component.set("v.vfHost", event.origin.split("://")[1]);
        helper.sendToVF(component, message);
      }
      if ( event.data.name === "updateRecord" ) {
        let params = {
          record: event.data.record,
        };
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

  executeToggleLayer: function(component, event, helper) {
    let message = {
      name: "toggleLayer",
      payload: {
        layers: component.get("v.layers")
      }
    }
    helper.sendToVF(component, message);
  },

})
