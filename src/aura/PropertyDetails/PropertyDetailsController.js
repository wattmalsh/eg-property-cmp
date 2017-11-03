({

  executeSaveSuccessful: function(component, event, helper) {
    // notify user of update
    // v.saveRecordBtnName value change is required to force a rerender to update the framework digest cycle
    let spinner = component.find("spinner");
    $A.util.addClass(spinner, "slds-hide");
    component.set("v.saveRecordBtnName", "Save Record");
  },

  handleSaveRecordClick: function(component, event, helper) {
    // v.saveRecordBtnName value change is required to force a rerender to update the framework digest cycle
    let spinner = component.find("spinner");
    $A.util.addClass(spinner, "slds-hide");
    // required to force a rerender to update the framework digest cycle
    component.set("v.saveRecordBtnName", "Pending...");
    $A.util.removeClass(spinner, "slds-hide");
    let compEvent = component.getEvent("saveRecord");
    compEvent.fire();
  },

  handleResetRecordClick: function(component, event, helper) {
    let compEvent = component.getEvent("resetRecord");
    compEvent.fire();
  },

})
