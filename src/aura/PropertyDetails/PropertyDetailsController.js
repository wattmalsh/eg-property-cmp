({

  executeSaveSuccessful: function(component, event, helper) {
    // v.saveRecordBtnName value change is required to force a rerender to update the framework digest cycle
    let spinner = component.find("spinner");
    let successText = component.find("successText");
    $A.util.addClass(spinner, "slds-hide");
    $A.util.addClass(successText, "fade-in-out");
    component.set("v.saveRecordBtnName", "Save Record");
  },

  handleSaveRecordClick: function(component, event, helper) {
    // v.saveRecordBtnName value change is required to force a rerender to update the framework digest cycle
    let spinner = component.find("spinner");
    let successText = component.find("successText");
    $A.util.removeClass(successText, "fade-in-out");
    $A.util.removeClass(spinner, "slds-hide");
    component.set("v.saveRecordBtnName", "Pending...");
    let compEvent = component.getEvent("saveRecord");
    compEvent.fire();
  },

  handleResetRecordClick: function(component, event, helper) {
    let compEvent = component.getEvent("resetRecord");
    compEvent.fire();
  },

})
