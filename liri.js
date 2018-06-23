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
var fs = require("fs");


start();

function start() {
  return inquirer
    .prompt([{
      type: 'list',
      name: 'option',
      choices: ['Twitter_Feed', 'Movie_Search', 'Spotify_Song_Search'],
      message: 'Where do you want to search?',
    }, {
      type: 'input',
      name: 'searchTerm',
      message: 'Hi! My name is Liri. Let me know what you need help finding!',
    }])
    .then(data => {
      if (data.option === 'Movie_Search') {
        getMovie(data.searchTerm)
      } else if (data.option === 'Spotify_Song_Search') {
        getSpotify(data.searchTerm)
      } else if (data.option === 'Twitter_Feed') {
        getTwitter(data.searchTerm)
      }
    });
}

function secondStart() {
  inquirer
    .prompt([{
      type: 'list',
      name: 'option',
      choices: ['Search Again', 'Done Searching'],
      message: 'Do you need to search for anything else?',
    }])
    .then(data => {
      if (data.option === 'Search Again') {
        return start();
      } else if (data.option === 'Done Searching') {
        return console.log("Thanks for using Liri!");
      }
    })
}

function getMovie(searchTerm) {
  request(OMDB_URL + searchTerm, function (error, response, body) {
    var jsonData = JSON.parse(body);
    console.log(jsonData);
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    fs.appendFile("random.txt", JSON.stringify(jsonData), function (err) {
      if (err) throw err;
      return secondStart();
    });
  });
}

function getSpotify(searchTerm) {
  // console.log(SPOTIFY);
  var spotify = new Spotify(SPOTIFY);
  spotify.search({
    type: 'track',
    query: searchTerm
  }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var song = data.tracks.items[0];
    // console.log(song);
    console.log(song.artists[0].name);
    console.log(song.artists[0].type);
    fs.appendFile("random.txt", JSON.stringify(song.artists[0].name + song.artists[0].type), function (err) {
      if (err) throw err;
      return secondStart();
    });
  });
}



function getTwitter(searchTerm) {
  // console.log(TWITTER);
  var client = new Twitter(TWITTER);

  var params = {
    screen_name: 'Dylan79984767'
  };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        var tweet = ('\n' + "Created On: " + tweets[i].created_at + '\n' + tweets[i].text + '\n');
        console.log(tweet);
        fs.appendFile("random.txt", JSON.stringify(tweet), function (err) {
          if (err) throw err;
        });
      }
      return secondStart();
    }
  });
}