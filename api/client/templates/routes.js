if (Meteor.isClient) {

  FlowRouter.route('/', {
    action: function() {
      BlazeLayout.render('main', {
        content: 'companies'
      });
    }
  });

  FlowRouter.route('/company/:token', {
    name: 'company',
    action: function(params, queryParams) {
      BlazeLayout.render('main', {
        content: 'company'
      });
    }
  });

  FlowRouter.route('/company/register/:token', {
    name: 'register',
    action: function(params, queryParams) {
      BlazeLayout.render('main', {
        content: 'register'
      });
    }
  });

  FlowRouter.route('/company/register/:token/success', {
    name: 'success',
    action: function(params, queryParams) {
      BlazeLayout.render('main', {
        content: 'success'
      });
    }
  });

  FlowRouter.route('/company/update/:token', {
    name: 'success',
    action: function(params, queryParams) {
      BlazeLayout.render('main', {
        content: 'update'
      });
    }
  });

}
