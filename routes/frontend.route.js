const router = require('express').Router();
const request = require('request');
var ejs = require('ejs');

router.get('/', function(req, res, next) {
	exports.getContacts()
  		.then(contacts => {
  			res.render("pages/index", {
		        status: contacts.status,
		        data: contacts.data
		    });
  		})
  		.catch(err => {
  			res.render("pages/index", {
		        status: 404,
		        error: "Can't retrive contacts..."
		    });
  		});
});

router.get('/about', function(req, res) {
    res.render('pages/about');
});

module.exports = router;

exports.getContacts = function getContacts(){
	return new Promise((resolve, reject) => {
		request('http://localhost:4000/api/contacts', {json:true}, function(err, res, body) {
		    if (err) {
		        // Reject the Promise with an error
		    	return reject(err)
		    }

		    return resolve(body)
		});
	});
}
