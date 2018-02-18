let buddies = require("../data/friend");

module.exports = function(app) {
  // show all of the buddies in a JSON format at the /api/buddies route
  app.get("/api/buddies", (req, res) => {
    res.json(buddies);
  });

  // take the userData and use it to finf the best match and then add user to buddies object
  app.post("/api/findBuddies", function(req, res) {
    console.log(req.body);

    // We will use this object to hold the "best match". We will constantly update it as we
    // loop through all of the options
    var bestMatch = {
      name: "",
      photo: "",
      buddyDifference: Infinity
    };

    // Here we take the result of the user"s survey POST and parse it.
    var userData = req.body;
    var userScores = userData.scores;

    // This variable will calculate the difference between the user"s scores and the scores of
    // each user in the database
    var totalDifference;

    // Here we loop through all the buddies possibilities in the database.
    for (var i = 0; i < buddies.length; i++) {
      var currentBuddy = buddies[i];
      totalDifference = 0;

      console.log(currentBuddy.name);

      // We then loop through all the scores of each friend
      for (var j = 0; j < currentBuddy.scores.length; j++) {
        var currentBuddyScore = currentBuddy.scores[j];
        var currentUserScore = userScores[j];

        // We calculate the difference between the scores and sum them into the totalDifference
        totalDifference += Math.abs(
          parseInt(currentUserScore) - parseInt(currentBuddyScore)
        );
      }

      // If the sum of differences is less then the differences of the current "best match"
      if (totalDifference <= bestMatch.buddyDifference) {
        // Reset the bestMatch to be the new buddy.
        bestMatch.name = currentBuddy.name;
        bestMatch.photo = currentBuddy.photo;
        bestMatch.buddyDifference = totalDifference;
      }
    }

    // Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
    // the database will always return that the user is the user's best friend).
    buddies.push(userData);

    // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page
    res.json(bestMatch);
  });
};
