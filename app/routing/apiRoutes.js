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
        // set most compatible with least score difference
        if(difference < mostCompatibleScore){
          mostCompatibleScore = difference;
          mostCompatible = i;
        }
        else{
          mostCompatibleScore = difference;
          mostCompatible = 0;
        }
        
      }

      // push new profile into friendsList array
      friendsList.push(req.body);

      res.json(friendsList[mostCompatible]);
    
  });

  // clear json friend list
  app.post("/api/clear", function(req, res) {
    friendsList = {
      "name":"Hugh Scores",
      "photo":"https://pmctvline2.files.wordpress.com/2018/08/jerry-seinfeld-season-10-interview.jpg?w=620&h=440&crop=1",
      "scores":[
          5,
          4,
          4,
          4,
          5,
          4,
          5,
          5,
          4,
          4
        ]
    
      
    },
    {
        "name":"Middle Man",
        "photo":"https://www.jpost.com/HttpHandlers/ShowImage.ashx?id=386351",
        "scores":[
            3,
            2,
            3,
            3,
            3,
            2,
            3,
            3,
            2,
            3
          ]
      
        
      },
      {
        "name":"Leo",
        "photo":"https://images.goodsmile.info/cgm/images/product/20161007/5999/41708/large/a2d320e8df22d9b2db81f67454cf4097.jpg",
        "scores":[
            1,
            1,
            1,
            2,
            1,
            2,
            1,
            2,
            2,
            2
          ]
      
        
      }

    res.json({ ok: true });
  });
};