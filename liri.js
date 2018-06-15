require("dotenv").config();
var request = require('request');
var keys = require("./keys");
var {
  TWITTER,
  SPOTIFY,
  OMDB_URL
} = require('./keys'); //destructuring
var inquirer = require('inquirer');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var parameter = process.argv[3];


inquirer
  .prompt([{
    type: 'list',
    name: 'option',
    choices: ['Twitter', 'Movies', 'Spotify'],
    message: 'Where do you want to search?',
  }, {
    type: 'input',
    name: 'searchTerm',
    message: 'Hi! My name is Liri. Let me know what you need help finding!',
  }])
  .then(data => {
    if (data.option === 'Movies') {

      getMovie(data.searchTerm)
    } else if (data.option === 'Sort') {
      let newArr = [];
      for (let i = 3; i < process.argv.length; i++) {
        newArr.push(process.argv[i])

      }
      let sortedArr = newArr.sort((a, b) => {
        return a - b
      })
      console.log(typeof sortedArr, sortedArr)
    } else if (data.option === 'Spotify') {
      getSpotify(data.searchTerm)
    } else if (data.option === 'Twitter') {
      getTwitter(data.searchTerm)
    }
  });

function getMovie(searchTerm) {
  request(OMDB_URL + searchTerm, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });


}

function getSpotify(searchTerm) {
  console.log(SPOTIFY);
  var spotify = new Spotify(SPOTIFY);

  spotify.search({
    type: 'track',
    query: searchTerm
  }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    console.log(data);
  });
}

function getTwitter(searchTerm) {
  console.log(TWITTER);
  var client = new Twitter(TWITTER);

  var params = {
    screen_name: 'Dylan79984767'
  };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        var tweet = ('\n' + "Created On: " + tweets[i].created_at + '\n' + tweets[i].text + '\n');
        console.log(tweet);

      }
    }
  });
}