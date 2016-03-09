if (Meteor.isClient) {

  Template.form.helpers({
    'company': function() {
      return Companies.findOne({
        serial: FlowRouter.getParam('serial')
      });
    }
  });

  Template.countries.onRendered(function() {
    $('option[value="' + this.data.country +'"]').attr('selected', true);
  });

}
