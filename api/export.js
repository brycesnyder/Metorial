Meteor.methods({
  exportAllCompanies: function() {
    var fields = [
      'company',
      'address_line_1',
      'address_line_2',
      'city',
      'country',
      'contact_name',
      'contact_email',
      'contact_phone',
      'scute_id',
      'distributor_id',
      'active',
      'registeredAt'
    ];
    var data = [];
    var companies = Companies.find().fetch();
    _.each(companies, function(c) {
      data.push([
        c.company,
        c.address_line_1,
        c.address_line_2,
        c.city,
        c.country,
        c.contact_name,
        c.contact_email,
        c.contact_phone,
        c.scute_id,
        c.distributor_id,
        c.active,
        moment.utc(c.registeredAt).format('DD/MM/YYYY')
      ]);
    });

    return {
      fields: fields,
      data: data
    };
  },
  exportCompany: function(id) {
    var fields = [
      'company',
      'address_line_1',
      'address_line_2',
      'city',
      'country',
      'contact_name',
      'contact_email',
      'contact_phone',
      'scute_id',
      'distributor_id',
      'active',
      'registeredAt'
    ];
    var data = [];
    var c = Companies.findOne(id);
    data.push([
      c.company,
      c.address_line_1,
      c.address_line_2,
      c.city,
      c.country,
      c.contact_name,
      c.contact_email,
      c.contact_phone,
      c.scute_id,
      c.distributor_id,
      c.active,
      moment.utc(c.registeredAt).format('DD/MM/YYYY')
    ]);
    return {
      fields: fields,
      data: data
    };
  }
});
