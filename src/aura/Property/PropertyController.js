({

  doInit: function(component, event, helper) {
    component.set("v.kmlLayers", [
      {
        url: 'https://sites.google.com/a/energygeeks.com/mkmf/ust/ou.kml',
        btnName: 'Ontario Utilities',
        displayName: 'Ontario Utilities',
        active: true,
        ref: null
      },
      {
        url: 'https://sites.google.com/a/energygeeks.com/mkmf/ust/ps.kml',
        btnName: 'Polaron Service Territory',
        displayName: 'Polaron Service Territory',
        active: true,
        ref: null
      },
      {
        url: 'https://sites.google.com/a/energygeeks.com/mkmf/ust/gs.kml',
        btnName: 'Grasshopper Service Territory',
        displayName: 'Grasshopper Service Territory',
        active: true,
        ref: null
      },
      {
        url: 'https://sites.google.com/a/energygeeks.com/mkmf/ust/us.kml',
        btnName: 'Upstream Service Territory',
        displayName: 'Upstream Service Territory',
        active: true,
        ref: null
      }
    ]);
    component.set("v.DEBUG_kmlLayers", JSON.stringify(component.get("v.kmlLayers")));
  },

  handleAttributeUpdate: function(component, event, helper) {
    component.set("v.DEBUG_eventData", JSON.stringify(event.getParam("record")));
    component.set("v.DEBUG_record", JSON.stringify(component.get("v.record")));
    component.set("v.DEBUG_fullRecord", JSON.stringify(component.get("v.fullRecord")));
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
    // set markerInOriginalPos to "false"
    component.set("v.markerInOriginalPos", "false");
  },

  handleSaveRecord: function(component, event, helper) {
    component.set("v.DEBUG_saveRecordEvent", "save record event received");
    component.find("forceRecord").saveRecord($A.getCallback(function(saveResult) {
      if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
        component.set("v.markerInOriginalPos", "false");
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
      component.set("v.DEBUG_saveRecordResults", saveResult.state)
    }));
  },

  recordUpdated: function(component, event, helper) {
    let eventParams = event.getParams();
    let changeType = eventParams.changeType;
    component.set("v.DEBUG_recordUpdatedChangeType", changeType)
    if (changeType === "ERROR") { /* handle error; do this first! */ }
    else if (changeType === "LOADED") {
      // if triggered by c.handleResetRecord
      if ( component.get("v.callResetRecordMethod") ) {
        let childComponent = component.find("propertyMapCmp");
        childComponent.resetRecord(component.get("v.record"));
        component.set("v.callResetRecordMethod", "false");
      }
    }
    else if (changeType === "REMOVED") { /* handle record removal */ }
    else if (changeType === "CHANGED") {
      let changedFields = eventParams.changedFields;
      component.set("v.DEBUG_changedFields", JSON.stringify(changedFields));
    }
  },

  handleResetRecord: function(component, event, helper) {
    component.set("v.markerInOriginalPos", "true");
    // calling the resetRecord method directly after reloadRecord invokes the method before teh record has been reset. solution is to call the method from recordUpdated where changetype === "LOADED"
    component.set("v.callResetRecordMethod", "true");
    component.find("forceRecord").reloadRecord();
  },

})
