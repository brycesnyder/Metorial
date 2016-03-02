Export = {
  allCompanies: function() {
    var self = this;
    Meteor.call('exportAllCompanies', function(error, data) {
      if (error) {
        alert(error);
        return false;
      }
      var csv = Papa.unparse(data);
      self._downloadCSV(csv);
    });
  },
  exportCompany: function(id) {
    var self = this;
    Meteor.call('exportCompany', id, function(error, data) {
      if (error) {
        alert(error);
        return false;
      }
      var csv = Papa.unparse(data);
      self._downloadCSV(csv);
    });
  },
  _downloadCSV: function(csv) {
    var blob = new Blob([csv]);
    var a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(blob, { type: "text/plain" });
    a.download = "companies.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};
