var request = require('request');
var fs = require('fs');
var token = require('./secrets.js');
var arg = process.argv.slice(2);

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  // making request
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + token.GITHUB_TOKEN // adding authorization header
    }
  };

  request(options, function(err, res, body) {
    cb(err, JSON.parse(body));
    // parsing body
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url);
  .pipe(fs.createWriteStream(filePath));  // downloading pics from avatar_urls with filename with login values
}

getRepoContributors(arg[0], arg[1], function(err, result) { // take comman line input instead of hardcoded value
  console.log("Errors:", err);
  result.forEach(function(obj) {
    var url = obj.avatar_url; // setting up avatar_urls to variable name url
    var filePath = obj.login; // setting up login values to variabale name filePath
    downloadImageByURL(url, './avatars/'+filePath+'.jpg');
  });
});





