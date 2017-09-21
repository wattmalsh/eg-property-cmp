// expensesController.js
({

  doInit: function(component, event, helper) {
    // Create server request
    var action = component.get("c.getExpenses"); // c in the controller represents the remote Apex controller (c in component markup represents the client-side controller)
    // Add callback behavior for when response received
    action.setCallback(this, function(response) { // this refers to the scope in which callback will execute, here this is the action handler function itself
      var state = response.getState();
      if (component.isValid() && state === "SUCCESS") {
        component.set("v.expenses", response.getReturnValue());
      }
      else {
        console.log("Failed with state: " + state);
      }
    });
    // Send server request
    $A.enqueueAction(action); // queue up server request
  },

  handleCreateExpense: function(component, event, helper) {
    var newExpense = event.getParam("expense");
    helper.createExpense(component, newExpense);
  },

  handleUpdateExpense: function(component, event, helper) {
    var updatedExp = event.getParam("expense");
    helper.updateExpense(component, updatedExp);
  },

})

