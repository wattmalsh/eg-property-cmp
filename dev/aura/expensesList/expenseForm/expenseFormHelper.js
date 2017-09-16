// expenseFormHelper.js
({
  validateExpenseForm: function(component) {
    var validExpense = true;

    var nameField = component.find("expname");
    var expname = nameField.get("v.value");
    if ($A.util.isEmpty(expname)) {
      validExpense = false; // this is the logic that says this field is required
      nameField.set("v.errors", [{message: "Expense name can't be blank."}]);
    }
    else {
      nameField.set("v.errors", null);
    }

    var amtField = component.find("amount");
    var amt = amtField.get("v.value");
    if ($A.util.isEmpty(amt) || isNaN(amt) || (amt <= 0.0)) {
      validExpense = false;
      amtField.set("v.errors", [{message: "Enter an expense amount."}]);
    }
    else {
      amtField.set("v.errors", null);
    }

    return validExpense;
  },

  createExpense: function(component, newExpense) {
    var createEvent = component.getEvent("createExpense");
    createEvent.setParams({ "expense": newExpense });
    createEvent.fire();
  },

})
