if (Meteor.isClient) {

  Meteor.subscribe('companies');

  Template.companies.helpers({
    'companies': function() {
      return Companies.find();
    }
  });

  Template.companies.events({
    'click .export': function() {
      Export.directory();
    },
    'click .company': function() {
      var company = this;
      FlowRouter.go('/:token', { token: company.token });
    },
    companyUrl: function() {
      var company = this;
      var params = {
          category: company.category,
          companyId: company._id
      };
      var routeName = "company";
      var path = FlowRouter.path(routeName, params, {});
      return path;
    }
  });

  Template.companyInfo.onCreated(function() {
    var self = this;
    self.autorun(function() {
      var token = FlowRouter.getParam('token');
      self.subscribe('company', token);
    });
  });

  Template.companyInfo.helpers({
    company: function() {
      var token = FlowRouter.getParam('token');
      var company = Companies.findOne({ token: token }) || {};
      Session.set('companyId', company._id);
      return company;
    }
  });

  Template.companyInfo.events({
    'click .export': function() {
      Export.directory(Session.get('companyId'));
    }
  });

}
