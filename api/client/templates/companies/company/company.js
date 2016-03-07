Template.company.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var serial = FlowRouter.getParam('serial');
    self.subscribe('serial', serial);
  });
});

Template.company.helpers({
  company: function() {
    var serial = FlowRouter.getParam('serial');
    var company = Companies.findOne({ serial: serial }) || {};
    Session.set('companyId', company._id);
    return company;
  },
  'registeredAt': function() {
    return moment(this.activatedAt).format("DD/MM/YYYY");
  },
  'renewalDate': function() {
    return moment(this.renewalDate).format("DD/MM/YYYY");
  },
  'state': function() {
    if (this.active) {
      return "ok";
    } else {
      return "remove";
    }
  }
});

Template.company.events({
  'click .export': function() {
    Export.directory(Session.get('companyId'));
  },
  'click .update': function(e) {
    e.preventDefault();
    FlowRouter.go('/company/update/:serial', {
      serial: FlowRouter.getParam('serial')
    });
  }
});
