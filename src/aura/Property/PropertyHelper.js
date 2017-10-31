({

  getAddress: function(component) {
    let record = component.get("v.record");
    let address = `${record.Street}, ${record.City}, ${record.State} ${record.PostalCode}, ${record.Country}`;
    return address;
  },

})
