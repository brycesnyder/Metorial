if (Meteor.isServer) {

  Meteor.publish('companies', function() {
    return Companies.find();
  });

  // Global Restivus API configuration
  var Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true
  });

  // TODO Look into tokens for sending data, currently API is exposed.
  // New REST API for Companies, excluding specified endpoitns.
  Api.addCollection(Companies, {
    excludedEndpoints: ['getAll', 'get', 'put', 'delete'],
    endpoints: {
      post: {
        authRequired: false,
        action: function(error) {
          var data = this.bodyParams; // NOT sanitized.
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
  // Api.addRoute('articles', {
  //   post: function() {
  //     var data = this.bodyParams;
  //     Articles.batchInsert(data);
  //     return Articles.find().fetch();
  //   }
  // });
  // Generates: GET, POST on /api/items and GET, PUT, DELETE on
  // /api/items/:id for the Items collection
  //Api.addCollection(Items);
  //Api.addCollection(Articles);
  // Api.addCollection(Articles, {
  //   excludedEndpoints: ['getAll', 'get', 'put', 'delete'],
  //   endpoints: {
  //     post: {
  //       authRequired: false,
  //       action: function(err) {
  //         //var data = JSON.parse(this.bodyParams);
  //         return this.bodyParams;
  //         // if (err) {
  //         //       return {
  //         //           statusCode: 401,
  //         //           body: { status: 'error', message: data
  //         //         }
  //         //       };
  //         //   } else {
  //         //       return {
  //         //           statusCode: 200,
  //         //           body: { status: 'Worked!', message: data}
  //         //       };
  //         //   }
  //       }
  //     }
  //   }
  // });
  // Generates: POST on /api/users and GET, DELETE /api/users/:id for
  // Meteor.users collection
  // Api.addCollection(Meteor.users, {
  //   excludedEndpoints: ['getAll', 'put'],
  //   routeOptions: {
  //     authRequired: true
  //   },
  //   endpoints: {
  //     post: {
  //       authRequired: false
  //     },
  //     delete: {
  //       roleRequired: 'admin'
  //     }
  //   }
  // });
  // Api.addRoute('/articles', {
  //   post: function() {
  //     debugger
  //     var data = this.urlParams;
  //     console.log(data);
  //   }
  // });

  // Maps to: /api/articles/:id
  // Api.addRoute('articles/:id', { // tbFpX8vA67B52gfnC
  //   authRequired: false
  // }, {
  //   get: function() {
  //     return Articles.findOne(this.urlParams.id);
  //   },
  //   delete: {
  //     roleRequired: ['author', 'admin'],
  //     action: function() {
  //       if (Articles.remove(this.urlParams.id)) {
  //         return {
  //           status: 'success',
  //           data: {
  //             message: 'Article removed'
  //           }
  //         };
  //       }
  //       return {
  //         statusCode: 404,
  //         body: {
  //           status: 'fail',
  //           message: 'Article not found'
  //         }
  //       };
  //     }
  //   }
  // });
