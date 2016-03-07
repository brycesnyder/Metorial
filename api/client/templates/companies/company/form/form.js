if (Meteor.isClient) {

  Template.form.helpers({
    'company': function() {
      return Companies.findOne({
        serial: FlowRouter.getParam('serial')
      });
    },
    'submit form': function(e) {
      e.preventDefault();
    },
    'click [name=submit]': function() {
      data = {};
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
      var showError = function(value) {
        $(value).parent().addClass('has-error');
        formError = true;
      };
      $.each(elems, function(key, value) {
        var val = $.trim($(value).val());
        if (val === '' && key !== 'addressLine2') {
          showError(value);
          return false;
        } else {
          if (key === 'contactEmail') {
            if (!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(val)) {
              showError(value);
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
  });

  Template.countries.onRendered(function() {
    $('option[value="' + this.data.country +'"]').attr('selected', true);
  });

}
