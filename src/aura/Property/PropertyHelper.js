({

  getAddress: function(record) {
    if ( record.Street === null ) {
      return 'null'
    } else {
      return `${record.Street}, ${record.City}, ${record.State} ${record.PostalCode}, ${record.Country}`;
    }
  },

})
