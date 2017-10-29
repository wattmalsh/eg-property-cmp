({

  handleUpdateRecordClick: function(component, event, helper) {
    let compEvent = component.getEvent("saveRecord");
    compEvent.fire();
  },

})
