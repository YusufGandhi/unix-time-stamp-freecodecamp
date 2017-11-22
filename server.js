// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var monthNames = ["January", "February", "March", "April", "May", "June", 
                  "July", "August", "September", "October", "November", "December"];

var resultObj = {
    "unix" : null,
    "natural": null
  };

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));



// // http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


// taking the unix time parameter
app.get(/^\/\d+$/, function(req, res) {
  // taking the number from the path
  var secondsInUnix = req.path.substring(1);
  // converting the seconds from path to Date object
  var date = new Date(secondsInUnix * 1000);
  // constructing the result string
  var resultStr = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
  // constructing the json result
  resultObj.unix = parseInt(secondsInUnix);
  resultObj.natural = resultStr;
  
  res.json(resultObj);
});

// taking the natural date parameter
app.get(/.*/, function(req, res) {
  var uri = decodeURIComponent(req.path.substring(1));
  var dateArr = uri.split(' ');
  
  // get rid of the potential ',' character from the date
  // dateArr[1] = dateArr[1].replace(',', '');

  // making the first character to upper case
  dateArr[0] = dateArr[0].replace(/^[a-z]/, dateArr[0][0].toUpperCase());
  // 
  var monthIndex = monthNames.indexOf(dateArr[0]);
  if( monthIndex >= 0) {
    var date = new Date(uri);
    resultObj.natural = dateArr.join(' ');
    resultObj.unix = date.getTime();    
  }
  res.json(resultObj);
  // var a = dateArr.shift();
  // a.split(' ').map((x) => dateArr.push(x));
  // dateArr = dateArr.map((x) => x.trim());
  
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
