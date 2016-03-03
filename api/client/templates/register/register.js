Template.register.events({
  'submit form': function(e) {
    e.preventDefault();
    var currentCompany = this._id;
    var data = {
      company: $('[name="company-name"]').val(),
      address_line_1: $('[name="address-line-1"]').val(),
      address_line_2: $('[name="address-line-2"]').val(),
      city: $('[name="address-city"]').val(),
      province: $('[name="address-province"]').val(),
      postal_code: $('[name="address-postal-code"]').val(),
      country: $('[name="address-country"]').val(),
      contact_name: $('[name="contact-name"]').val(),
      contact_email: $('[name="contact-email"]').val(),
      contact_phone:$('[name="contact-phone"]').val(),
      active: true,
      registeredAt: moment(new Date)._d
    }
    Companies.update({ _id: currentCompany }, {
      $set: data
    });
    Meteor.logout();
    Router.go('/');
  }
});

Template.register.onRendered(function() {
  $('.register').validate();
});
