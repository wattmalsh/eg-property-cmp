({

  executeSetOriginalRecord: function(component, event, helper) {
    component.set("v.originalRecord", component.get("v.record"));
    component.set("v.originalAddress", component.get("v.address"));
  },

  handleSaveRecordClick: function(component, event, helper) {
    let compEvent = component.getEvent("saveRecord");
    compEvent.fire();
  },

  handleResetRecordClick: function(component, event, helper) {
    let compEvent = component.getEvent("resetRecord");
    compEvent.fire();
  },

})
