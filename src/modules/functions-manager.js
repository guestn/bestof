var request = require('request');
var rp = require('request-promise')



exports.process = function(req, res) {
	
	var CLIENTID = '986c2242a5c14645ba742b0750bea0a7';
	var REDIRECTURI = 'http://localhost:3020';

	
	/* pull in the form data */
	console.log(req.body.name);
	var username = req.body.name;
	var instaToken = req.body.accessToken;	

/*
	request('https://api.instagram.com/v1/users/search?q='+username+' &access_token='+instaToken+'&scope=public_content', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    console.log(JSON.parse(body)) 
	    var bodyData = JSON.parse(body);
	    userID = bodyData.data[0].id;
	    //getImages(userID,instaToken)
	  } else {
		  console.log('ERR',response)
	  }
	}).pipe(getImages(userID,instaToken))
*/
  var userID = '';

	var options = {
    method: 'GET',
    uri: 'https://api.instagram.com/v1/users/search?q='+username+' &access_token='+instaToken+'&scope=public_content',
	};
	var options2 = {
    method: 'GET',
    uri: 'https://api.instagram.com/v1/users/'+userID+'/media/recent/?access_token='+instaToken+'&scope=public_content',
    //resolveWithFullResponse: true,    //  <---  <---  <---  <---
	};

	rp(options)
  .then(function (body) {
    console.log(body)
		var bodyData = JSON.parse(body);
		userID = bodyData.data[0].id;
		//getImages(userID,instaToken)
		console.log('userID',userID)
    options2.uri = 'https://api.instagram.com/v1/users/'+userID+'/media/recent/?access_token='+instaToken+'&scope=public_content';
    return rp(options2);
  }).then(function (body){
    res.json(body);
  })
  .catch(function (err) {
    console.log('ERR2', err)
  });


	

	// on insta profile: window._sharedData.entry_data.ProfilePage[0].user.id	
	//var userID = '4372270026'//<-nicholas.guest
			//var userID = '787132' // <- natgeo
			//var payload = {};
			
/*
			request('https://api.instagram.com/v1/users/'+userID+'/media/recent/?access_token='+instaToken+'&scope=public_content', function (error, response, body) {
					  if (!error && response.statusCode == 200) {
			    //console.log(body) 
			    res.json(body);
			  } else {
				  console.log('ERR2')
			  }
			})
*/

console.log('finished');

}