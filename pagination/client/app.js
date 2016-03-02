Template.posts.events({
  'click .load-more': function (event, instance) {
    event.preventDefault();

    // get current value for limit, i.e. how many posts are currently displayed
    var limit = instance.limit.get();

    // increase limit by 5 and update it
    limit += 5;
    instance.limit.set(limit);
  }
});

Template.posts.helpers({
  // the posts cursor
  posts: function () {
    return Template.instance().posts();
  },
  // are there more posts to show?
  hasMorePosts: function () {
    return Template.instance().posts().count() >= Template.instance().limit.get();
  }
});

Template.posts.onCreated(function () {

  // 1. Initialization

  var instance = this;

  // initialize the reactive variables
  instance.loaded = new ReactiveVar(0);
  instance.limit = new ReactiveVar(5);

  // 2. Autorun

  // will re-run when the "limit" reactive variables changes
  instance.autorun(function () {

    // get the limit
    var limit = instance.limit.get();

    console.log("Asking for "+limit+" posts…")

    // subscribe to the posts publication
    var subscription = instance.subscribe('posts', limit);

    // if subscription is ready, set limit to newLimit
    if (subscription.ready()) {
      console.log("> Received "+limit+" posts. \n\n")
      instance.loaded.set(limit);
    } else {
      console.log("> Subscription is not ready yet. \n\n");
    }
  });

  // 3. Cursor

  instance.posts = function() {
    return Posts.find({}, {limit: instance.loaded.get()});
  }

});
