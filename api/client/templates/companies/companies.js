if (Meteor.isClient) {

  Meteor.subscribe('companies');

  Template.companies.helpers({
    'companies': function() {
      return Companies.find();
    }
  });

  Template.companies.events({
    'click .export-all': function() {
      Export.allCompanies();
    }
  });

}
