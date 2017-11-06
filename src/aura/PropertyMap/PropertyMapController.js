({

  doInit: function(component, event, helper) {
    component.set("v.lcHost", window.location.hostname);
    component.set("v.vfHost", window.location.hostname.split(".")[0]);

    window.addEventListener("message", function(e) {
      if ( !e.origin.match("https://" + component.get("v.vfHost")) ) {
        // Not the expected origin: reject message
        return;
      }
      // Only handle messages we are interested in
      if (e.data === "init") {
        let message = {
          name: "initResponse",
          payload: {
            record: component.get("v.record"),
            address: component.get("v.closestMatchingAddress"),
            layers: component.get("v.layers")
          }
        }
        component.set("v.vfHost", e.origin.split("://")[1]);
        helper.sendToVF(component, message);
      }
      if ( e.data.name === "updateRecord" ) {
        let params = {
          record: e.data.record,
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
