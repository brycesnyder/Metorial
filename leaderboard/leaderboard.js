PlayersList = new Mongo.Collection('players');

if (Meteor.isClient) {
  Meteor.subscribe('thePlayers');
  Template.leaderboard.helpers({
    'player': function() {
      var currentUserId = Meteor.userId();
      return PlayersList.find({}, {sort: {score: -1, name: 1}});
    },
    'selectedClass': function() {
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if (playerId == selectedPlayer) {
        return "selected";
      }
    },
    'showSelectedPlayer': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne(selectedPlayer);
    }
  });

  Template.leaderboard.events({
    'click li.player': function() {
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
    },
    'click .increment': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('modifyPlayerScore', { id: selectedPlayer, score: 5 });
    },
    'click .decrement': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('modifyPlayerScore', { id: selectedPlayer, score: -5 });
    },
    'click .remove': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('removePlayerData', selectedPlayer);
    }
  });

  Template.addPlayerForm.events({
    'submit form': function(e) {
      e.preventDefault();
      var playerNameVar = e.target.playerName.value;
      var playerScoreVar = e.target.playerScore.value;
      if (playerNameVar === '') {
        alert('Cannot have an empty name.');
        return false;
      }
      e.target.playerName.value = '';
      e.target.playerScore.value = '';
      Meteor.call('insertPlayerData', {
        playerName: playerNameVar,
        playerScore: playerScoreVar
      });
    }
  });
}


if (Meteor.isServer) {
  Meteor.publish('thePlayers', function() {
    var currentUserId = this.userId;
    return PlayersList.find({createdBy: currentUserId});
  });

  Meteor.methods({
    'insertPlayerData': function(data) { // playerName, playerScore
      var currentUserId = Meteor.userId();
      PlayersList.insert({
        name: data.playerName,
        score: (data.playerScore === '') ? 0 : data.score,
        createdBy: currentUserId
      });
    },
    'removePlayerData': function(selectedPlayer) {
      var currentUserId = Meteor.userId();
      PlayersList.remove({_id: selectedPlayer, createdBy: currentUserId});
    },
    'modifyPlayerScore': function(player) {
      var currentUserId = Meteor.userId();
      PlayersList.update({_id: player.id, createdBy: currentUserId}, { $inc: { score: player.score } });
    }
  });
}

//121
