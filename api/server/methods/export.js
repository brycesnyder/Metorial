if (Meteor.isServer) {

  var data = [];
  var fields = [
    'name',
    'addressLine1',
    'addressLine2',
    'city',
    'postCode',
    'country',
    'contactName',
    'contactEmail',
    'contactPhone',
    'token',
    //'distributor_id',
    'active',
    'registeredAt'
  ];

  Meteor.methods({
    _populateData: function(company) {
      data.push([
        company.name,
        company.addressLine1,
        company.addressLine2,
        company.city,
        company.country,
        company.contactName,
        company.contactEmail,
        company.contactPhone,
        company.token,
        //company.distributor_id,
        company.active,
        moment.utc(company.registeredAt).format('DD/MM/YYYY')
      ]);
    },
    export: function(id) {
      data = [];
      if (id !== 'all') {
        Meteor.call('_populateData', Companies.findOne(id));
      } else {
        _.each(Companies.find().fetch(), function(company) {
          Meteor.call('_populateData', company);
        });
      }
      return {
        fields: fields,
        data: data
      };
    }
  });

}
