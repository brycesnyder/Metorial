if (Meteor.isClient) {



  Template.register.events({
    'click [name="agree"]': function() {
      var company = Companies.findOne({
        serial: FlowRouter.getParam('serial')
      });
      data.registeredAt = moment(new Date)._d;
      data.renewalDate = moment().add(375, 'days')._d;
      data.active = true;
      Companies.update({
        _id: company._id
      }, {
        $set: data
      });
      FlowRouter.go('/company/register/:serial/success', {
        serial: company.serial
      });
      $('.modal-backdrop').remove();
      data = {};
    }
  });

}
