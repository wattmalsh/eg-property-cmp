// expenseFormController.js
({
  handleCreateExpense: function(component, event, helper) {
    if (helper.validateExpenseForm(component)) {
      var newExpense = component.get("v.newExpense");
      helper.createExpense(component, newExpense);
    }
  },
  
  handleResetForm: function(component, event, helper) {
    component.find("form").reset();
  }
})
