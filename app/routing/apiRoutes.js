// create variable getting data from friends.js 
var friendsList = require("../data/friends");


module.exports = function(app) {

  // get json data
  app.get("/api/friendslist", function(req, res) {
    res.json(friendsList);
  });

  app.post("/api/friendslist", function(req, res) { 
      // set initial value for most compatible friend 
      var mostCompatible = 0;

      // set initial value for most compatible score
      var mostCompatibleScore = 0;
      // new score variable
      var userScore = req.body.scores;
      // loop through all existing friends
      for(let i = 0; i < friendsList.length; i++){

        // create variable for every current friend's score to compare to new friend from user input
        var currentFriend = friendsList[i].scores;

        // create initial value for score difference
        var difference = 0;

        // loop through new score
        for (let j = 0; j < userScore.length; j++){
          // calculate difference from new score and current friend score
          difference+= Math.abs(userScore[j] - currentFriend[j])

        }
        console.log(difference);

        if(difference < mostCompatibleScore){
          mostCompatibleScore = difference;
          mostCompatible = i;
        }
        
      }

      // push new profile into friendsList array
      friendsList.push(req.body);

      res.json(friendsList[mostCompatible]);
    
  });

  app.post("/api/clear", function(req, res) {
    friendsList.length = 0;

    res.json({ ok: true });
  });
};