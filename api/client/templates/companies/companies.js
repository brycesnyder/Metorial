if (Meteor.isClient) {

  Meteor.subscribe('companies');

  Meteor.startup(function() {
    Session.set('sortOrder', 1);
  });

  Template.companies.helpers({
    'companies': function() {
      return Companies.find({}, { sort: { name: Session.get('sortOrder') }});
    },
    'state': function() {
      if (this.active) {
        return "ok";
      } else {
        return "remove";
      }
    }
  });

  Template.companies.events({
    'click .export': function() {
      Export.directory();
    },
    'click th.name': function() {
      Session.set('sortOrder', (Session.get('sortOrder') === -1) ? 1 : -1);
      $('.glyphicon').toggleClass('glyphicon-chevron-up glyphicon-chevron-down');
    },
    'click .company': function() {
      var company = this;
      FlowRouter.go('/company/:serial', { serial: company.serial });
    },
    'click .logout': function(e) {
      e.preventDefault();
      Meteor.logout();
      FlowRouter.go('/');
    }
  });

}
