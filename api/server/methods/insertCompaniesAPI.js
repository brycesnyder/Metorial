if (Meteor.isServer) {

  var Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true
  });

  // TODO Look into tokens for sending data, currently API is exposed.
  Api.addCollection(Companies, {
    excludedEndpoints: ['getAll', 'get', 'put', 'delete'],
    endpoints: {
      post: {
        authRequired: false,
        action: function(error) {
          var data = this.bodyParams; // TODO NOT sanitized.
          Companies.batchInsert(data);
          if (error) {
            return {
              statusCode: 401,
              body: {
                error: error,
                status: 'Error',
                message: 'Could not insert the data'
              }
            };
          }
          return {
            statusCode: 200,
            body: {
              errorStatus: error,
              status: 'Success',
              message: 'Successfully received.'
            }
          };
        }
      }
    }
  });
}
