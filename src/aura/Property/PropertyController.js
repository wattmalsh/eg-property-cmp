({

  afterLayersScriptLoaded: function(component, event, helper) {
    let layers = [];
    let importedLayers = globalvalues.kml_layers;
    // $Resource.layers contains a layers object with layerName: url
    for ( let layer in importedLayers ) {
      layers.push({
        name: layer,
        url: importedLayers[layer],
        active: false
      })
    }
    component.set("v.layers", layers);
  },

  handleUpdateRecord: function(component, event, helper) {
    component.set("v.record", event.getParam("record"));
    let simple = component.get("v.record");
    let full = component.get("v.fullRecord");
    full.fields.Street.value = simple.Street;
    full.fields.City.value = simple.City;
    full.fields.State.value = simple.State;
    full.fields.PostalCode.value = simple.PostalCode;
    full.fields.Country.value = simple.Country;
    full.fields.Latitude.value = simple.Latitude;
    full.fields.Longitude.value = simple.Longitude;
    component.set("v.fullRecord", full)
    component.set("v.markerInOriginalPos", false);
    component.set("v.address", helper.getAddress(component));
  },

  handleSaveRecord: function(component, event, helper) {
    component.find("forceRecord").saveRecord($A.getCallback(function(saveResult) {
      if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
        component.set("v.markerInOriginalPos", true);
        console.log("Save completed successfully.");
      } else if (saveResult.state === "INCOMPLETE") {
        //TODO: use UI message to show this
        console.log("User is offline, device doesn't support drafts.");
      } else if (saveResult.state === "ERROR") {
        //TODO: use UI message to show this
        console.log('Problem saving record, error: ' + JSON.stringify(saveResult.error));
      } else {
        //TODO: use UI message to show this
        console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
      }
    }));
  },

  handleToggleLayer: function(component, event, helper) {
    let layerName = event.getParam("layerName");
    let layers = [];
    component.get("v.layers").forEach((layer) => {layers.push(layer)});
    for ( let i = 0; i < layers.length; i++ ) {
      if ( layers[i].name === layerName ) {
        layers[i].active = layers[i].active ? false : true;
      }
    }
    component.set("v.layers", layers);
    let propertyMapCmp = component.find("propertyMapCmp");
    propertyMapCmp.toggleLayer();
  },

  recordUpdated: function(component, event, helper) {
    let eventParams = event.getParams();
    let changeType = eventParams.changeType;
    if (changeType === "ERROR") { /* handle error; do this first! */ }
    else if (changeType === "LOADED") {
      let record = component.get("v.record");
      component.set("v.address", helper.getAddress(component));
      let propertyDetailsCmp = component.find("propertyDetailsCmp");
      propertyDetailsCmp.setOriginalRecord();
      // if triggered by c.handleResetRecord
      if ( component.get("v.callResetRecordMethod") ) {
        let propertyMapCmp = component.find("propertyMapCmp");
        propertyMapCmp.resetRecord();
        component.set("v.callResetRecordMethod", "false");
      }
    }
    else if (changeType === "REMOVED") { /* handle record removal */ }
    else if (changeType === "CHANGED") {
      let changedFields = eventParams.changedFields;
      let propertyDetailsCmp = component.find("propertyDetailsCmp");
      propertyDetailsCmp.setOriginalRecord();
    }
  },

  handleResetRecord: function(component, event, helper) {
    // calling the resetRecord method directly after reloadRecord invokes the method before the record has been reset.
    component.set("v.markerInOriginalPos", true);
    component.set("v.callResetRecordMethod", "true");
    component.find("forceRecord").reloadRecord();
  },

})
