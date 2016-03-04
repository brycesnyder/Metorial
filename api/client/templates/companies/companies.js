if (Meteor.isClient) {

  Meteor.subscribe('companies');

  Meteor.startup(function() {
    Session.set('sortOrder', 1);
  });

  Template.companies.helpers({
    'companies': function() {
      return Companies.find({}, { sort: { name: Session.get('sortOrder') }});
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
      FlowRouter.go('/company/:token', { token: company.token });
    }
    /* companyUrl: function() {
      var company = this;
      var params = {
          category: company.category,
          companyId: company._id
      };
      var routeName = "company";
      var path = FlowRouter.path(routeName, params, {});
      return path;
    } */
  });

  Template.company.onCreated(function() {
    var self = this;
    self.autorun(function() {
      var token = FlowRouter.getParam('token');
      self.subscribe('company', token);
    });
  });

  Template.company.helpers({
    company: function() {
      var token = FlowRouter.getParam('token');
      var company = Companies.findOne({ token: token }) || {};
      Session.set('companyId', company._id);
      return company;
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
    }
  });

}
