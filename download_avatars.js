var request = require('request');
var fs = require('fs');
var token = require('./secrets.js');

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
  // download pic from given url with filepath
  request.get(url)

  .pipe(fs.createWriteStream(filePath));
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  result.forEach(function(obj) {
    console.log(obj.avatar_url); // printing out avatar_urls

  })
  // console.log("Result:", result);
});

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")


