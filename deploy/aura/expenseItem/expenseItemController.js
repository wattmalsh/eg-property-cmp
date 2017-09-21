// expenseItemController.js
({
  clickReimbursed: function(component, event, helper) {
    var expense = component.get("v.expense");
    var updateEvent = component.getEvent("updateExpense"); // create a custom event named updateExpense
    updateEvent.setParams({ "expense": expense }); // package expense into the event
    updateEvent.fire();
  },
})
