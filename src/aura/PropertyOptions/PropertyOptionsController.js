({

  handleToggleLayerClick: function(component, event, helper) {
    let compEvent = component.getEvent("toggleLayer");
    let layerName = event.getSource().get("v.label");
    compEvent.setParams({ layerName: layerName });
    compEvent.fire();
  },

})
