// expensesHelper.js
// get, process, set
({
  saveExpense: function(component, expense, callback) {
    var action = component.get("c.saveExpense");
    action.setParams({
      "expense": expense
    });
    if (callback) {
      action.setCallback(this, callback);
    }
    $A.enqueueAction(action);
  },
  resetForm: function(component) {
    var resetEvent = component.getEvent("resetForm");
    resetEvent.setParams({ "string": "" });
    resetEvent.fire();
  },
  createExpense: function(component, expense) { // it is convention and recommended practice to always provide the component as the first parameter to helper functions
    this.saveExpense(component, expense, function(response) {
      var state = response.getState();
      if (component.isValid() && state === "SUCCESS") {
        this.resetForm(component);
        var expenses = component.get("v.expenses");
        expenses.push(response.getReturnValue());
        component.set("v.expenses", expenses);
      }
    });
  },
  updateExpense: function(component, expense) {
    this.saveExpense(component, expense);
  },
})
