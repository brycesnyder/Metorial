if (Meteor.isClient) {

  FlowRouter.route('/', {
    action: function() {
      BlazeLayout.render('main', {
        content: 'login'
      });
    }
  });

  FlowRouter.route('/companies', {
    action: function() {
      BlazeLayout.render('main', {
        content: 'companies'
      });
    }
  });

  FlowRouter.route('/company/:serial', {
    name: 'company',
    action: function(params, queryParams) {
      BlazeLayout.render('main', {
        content: 'company'
      });
    }
  });

  FlowRouter.route('/company/register/:serial', {
    name: 'register',
    action: function(params, queryParams) {
      BlazeLayout.render('main', {
        content: 'register'
      });
    }
  });

  FlowRouter.route('/company/register/:serial/success', {
    name: 'success',
    action: function(params, queryParams) {
      BlazeLayout.render('main', {
        content: 'success'
      });
    }
  });

  FlowRouter.route('/company/update/:serial', {
    name: 'update',
    action: function(params, queryParams) {
      BlazeLayout.render('main', {
        content: 'update'
      });
    }
  });

}
