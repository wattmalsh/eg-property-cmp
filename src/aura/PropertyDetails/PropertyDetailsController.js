({

  handleSaveRecordClick: function(component, event, helper) {
    let compEvent = component.getEvent("saveRecord");
    compEvent.fire();
  },

  handleResetRecordClick: function(component, event, helper) {
    let compEvent = component.getEvent("resetRecord");
    compEvent.fire();
  }

})
