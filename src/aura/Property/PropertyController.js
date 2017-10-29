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
  },

  handleSaveRecord: function(component, event, helper) {
    component.find("forceRecord").saveRecord($A.getCallback(function(saveResult) {
      if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
        //TODO: use UI message to show this
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

  recordUpdated: function(component, event, helper) {
    let changeType = event.getParams().changeType;
    if (changeType === "ERROR") { /* handle error; do this first! */ }
    else if (changeType === "LOADED") { /* handle record load */ }
    else if (changeType === "REMOVED") { /* handle record removal */ }
    else if (changeType === "CHANGED") {
      /* handle record change; reloadRecord will cause you to lose your current record, including any changes you’ve made */
      component.find("forceRecord").reloadRecord();
    }
  },

})
