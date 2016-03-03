if (Meteor.isClient) {

  FlowRouter.route('/', {
    action: function() {
      BlazeLayout.render('main', {
        content: 'companies'
      });
    }
  });

  FlowRouter.route('/:token', {
    name: 'company',
    action: function(params, queryParams) {
      BlazeLayout.render('main', {
        content: 'companyInfo'
      });
    }
  });

  FlowRouter.route('/register/:token', {
    name: 'register',
    action: function(params, queryParams) {
      BlazeLayout.render('main', {
        content: 'register'
      });
    }
  });

}
