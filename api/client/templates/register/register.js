if (Meteor.isClient) {

  var data = {};

  Template.registerForm.helpers({
    'company': function() {
        return Companies.findOne({ token: FlowRouter.getParam('token') });
    }
  });

  Template.register.events({
    'submit form': function(e) {
      e.preventDefault();
    },
    'click [name=submit]': function() {
      var error = false;
      var elems = {
        name: $('[name="name"]'),
        addressLine1: $('[name="addressLine1"]'),
        addressLine2: $('[name="addressLine2"]'),
        city: $('[name="city"]'),
        province: $('[name="province"]'),
        postalCode: $('[name="postalCode"]'),
        country: $('[name="country"]'),
        contactName: $('[name="contactName"]'),
        contactEmail: $('[name="contactEmail"]'),
        contactPhone: $('[name="contactPhone"]')
      };
      var setError = function(value) {
        $(value).parent().addClass('has-error');
        formError = true;
      };
      $.each(elems, function(key, value) {
        var val = $.trim($(value).val());
        if (val === '' && key !== 'addressLine2') {
          setError(value);
          return false;
        } else {
          if (key === 'contactEmail') {
            if (!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(val)) {
              setError(value);
              return false;
            }
          }
          formError = false;
          $(value).parent().removeClass('has-error');
          data[key] = val;
        }
      });
      if (!formError) {
        $('#terms').modal('show');
      }
    },
    'click [name="agree"]': function() {
      var company = Companies.findOne({ token: FlowRouter.getParam('token') });
      data.registeredAt = moment(new Date)._d;
      data.renewalDate = moment().add(375, 'days')._d;
      Companies.update({
        _id: company._id
      }, {
        $set: data
      });
      FlowRouter.go('/company/register/:token/success', {
        token: company.token
      });
      $('.modal-backdrop').remove();
      data = {};
    }
  });

}
