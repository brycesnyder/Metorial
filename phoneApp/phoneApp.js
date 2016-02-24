if (Meteor.isClient) {
  Template.takePhoto.events({
    'click .capture': function() {
      console.log('Button clicked.');
      MeteorCamera.getPicture({}, function(error, data) {
        Session.set('photo', data);
        console.log(data);
      });
    }
  });

  Template.takePhoto.helpers({
    'photo': function() {
      return Session.get('photo');
    }
  });
}
