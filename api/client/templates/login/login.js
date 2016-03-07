if (Meteor.isClient) {

  Template.login.events({
    'submit form': function(e) {
      e.preventDefault();
      var username = $('[name="username"]').val();
      var password = $('[name="password"]').val();
      Meteor.loginWithPassword(username, password, function(error) {
        (error) ? console.log(error.reason) : FlowRouter.go("/companies");
      });
    }
  });

}
