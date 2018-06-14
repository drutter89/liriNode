var request = require('request');
var keys = require("./keys");
var {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN_KEY,
  TWITTER_ACCESS_TOKEN_SECRET,
  SPOTIFY_ID,
  SPOTIFY_SECRET,
  OMDB_URL
} = require('./keys'); //destructuring
var inquirer = require('inquirer');
var Spotify = require('node-spotify-api');


inquirer
  .prompt([{
    type: 'list',
    name: 'option',
    choices: ['Twitter', 'Movies', 'Spotify', 'Maps', 'Sort'],
    message: 'Where do you want to search?',
  }, {
    type: 'input',
    name: 'searchTerm',
    message: 'Tell me what you are looking for my dear.',
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
    } else if (data.option === 'Maps') {
      findLocation(data.searchTerm)
    } else if (data.option === 'Spotify"') {
      getSpotify(data.searchTerm)
    }
  });

function getMovie(searchTerm) {
  request(OMDB_URL + searchTerm, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });


}

function findLocation(searchTerm) {
  request(OMDB_URL + searchTerm, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });

}

function getSpotify(searchTerm) {

  var spotify = new Spotify({
    id: SPOTIFY_ID,
    secret: SPOTIFY_SECRET
  });

  spotify.search({
    type: 'track',
    query: 'All the Small Things'
  }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    console.log(data.getSpotify);
  });
}