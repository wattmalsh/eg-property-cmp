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

  handleResetRecord: function(component, event, helper) {
    // calling the resetRecord method directly after reloadRecord invokes the method before the record has been reset.
    component.set("v.markerInOriginalPos", true);
    component.set("v.callResetRecordMethod", "true");
    component.find("forceRecord").reloadRecord();
  },

  handleUpdateRecord: function(component, event, helper) {
    component.set("v.record", event.getParam("record"));
    let simple = component.get("v.record");
    let full = component.get("v.fullRecord");
    full.fields.Pinned_Coordinates__Latitude__s.value = simple.Latitude;
    full.fields.Pinned_Coordinates__Longitude__s.value = simple.Longitude;
    full.fields.Pinned__c.value = true;
    component.set("v.fullRecord", full)
    component.set("v.markerInOriginalPos", false);
    component.set("v.closestMatchingAddress", helper.getAddress(simple));
  },

  handleSaveRecord: function(component, event, helper) {
    component.find("forceRecord").saveRecord($A.getCallback(function(saveResult) {
      if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
        console.log("Save completed successfully.");
        // update originalRecord latLng
        let record = component.get("v.record");
        let originalRecord = Object.assign({}, component.get("v.record"));
        originalRecord.Latitude = record.Latitude;
        originalRecord.Longitude = record.Longitude;
        component.set("v.originalRecord", record);
        component.set("v.markerInOriginalPos", true);
        let propertyDetailsCmp = component.find("propertyDetailsCmp");
        propertyDetailsCmp.saveSuccessful();
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
      // set the latLng values in record to shorter form
      let record = Object.assign({}, component.get("v.record"));
      record.Latitude = record.Pinned_Coordinates__Latitude__s;
      record.Longitude = record.Pinned_Coordinates__Longitude__s;
      component.set("v.record", record);
      component.set("v.originalRecord", record);
      // form address from fields
      let address = helper.getAddress(record);
      component.set("v.closestMatchingAddress", address);
      component.set("v.address", address);
      // if triggered by c.handleResetRecord, call PropertyMap's resetRecord method
      if ( component.get("v.callResetRecordMethod") ) {
        let propertyMapCmp = component.find("propertyMapCmp");
        propertyMapCmp.resetRecord();
        component.set("v.callResetRecordMethod", "false");
      }
    }
    else if (changeType === "REMOVED") { /* handle record removal */ }
    else if (changeType === "CHANGED") { }
  },

})
