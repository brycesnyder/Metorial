if (Meteor.isClient) {

  Export = {
    directory: function(id) {
      var self = this;
      if (id === undefined) {
        id = 'all';
      }
      Meteor.call('export', id, function(error, data) {
        if (error) {
          throw new Meteor.Error(500, 'There was an error processing your request');
        }
        self._downloadCSV(Papa.unparse(data));
      });
    },
    // TODO Clean up this download if possible, find another way to manipulate the download?
    _downloadCSV: function(csv) {
      var blob = new Blob([csv]);
      var a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(blob, {
        type: "text/plain"
      });
      a.download = "companies.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

}
