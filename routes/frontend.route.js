const router = require('express').Router();
const helpers = require('../helpers/awss3.frontend.helpers');
// EJS templating system
var ejs = require('ejs');


// Get all Buckets from AWSS3
router.get('/', function(req, res, next) {
	helpers.getBuckets()
  		.then(buckets => {
  			res.render("pages/index", {
		        status: buckets.status,
		        data: buckets.data.Buckets
		    });
  		})
  		.catch(err => {
  			res.render("pages/index", {
		        status: 404,
		        error: "Can't retrive buckets: " + err
		    });
  		});
});
// Create new Bucket on AWSS3
router.post('/', function(req, res){
	helpers.createBucket(req.body.bucketname)
		.then(bucket => {
			helpers.getBuckets()
		  		.then(buckets => {
		  			res.render("pages/index", {
				        status: buckets.status,
				        data: buckets.data.Buckets
				    });
		  		})
		  		.catch(err => {
		  			res.render("pages/index", {
				        status: 404,
				        error: "Can't retrive buckets: " + err
				    });
		  		});
		});
	
});
// Delete a Bucket specified in URL param
router.get('/deletebucket/:bucketname', function(req, res){
	helpers.deleteBucket(req.params.bucketname)
		.then(bucket => {
			helpers.getBuckets()
		  		.then(buckets => {
		  			res.writeHead(302, {
					  'Location': '/'
					  //add other headers here...
					});
					res.end();
		  		})
		  		.catch(err => {
		  			res.writeHead(302, {
					  'Location': '/'
					  //add other headers here...
					});
					res.end();
		  		});
		});
	
});
// Handling object uploads
router.get('/upload', function(req, res) {
    res.render('pages/uploads');
});

router.post('/upload', function(req, res) {	
	var formidable = require('formidable');
	var fs = require("fs");

	var fileNames = [];
	// parse a file upload
    var form = new formidable.IncomingForm();
    form.uploadDir = './uploads/';
    form.encoding = 'utf-8';
    // form.uploadDir = "./uploads";
    form.keepExtensions = true;
    form.multiples = true;
    form.maxFieldsSize = 100 * 1024 * 1024;

    form.on('file', function(name, file) {
		fs.rename(file.path, form.uploadDir + file.name, function(err, data){
			helpers.uploadObject('ujteszt', form.uploadDir + file.name, 'apache/')
				.then(bucket => {
					helpers.getBuckets()
				  		.then(buckets => {
				  			res.writeHead(302, {
							  'Location': '/upload'
							  //add other headers here...
							});
							res.end();
				  		})
				  		.catch(err => {
				  			res.writeHead(302, {
							  'Location': '/upload'
							  //add other headers here...
							});
							res.end();
				  		});
				});
		});
	});

    form.parse(req, (err, fields, files) => {
    	console.log('parsing...');
    });

    form.on('progress', function(bytesReceived, bytesExpected) {
		console.log('inprogress...');
	});

	form.on('field', function(name, value) {
		console.log(name + " - " + value);
	});

	form.on('fileBegin', function(name, file) {
		console.log('File: ' + name);
	});

	form.on('error', function(err) {
		console.log('Error: ' + err);
	});

	form.on('aborted', function() {
		console.log('aborted...');
	});

	form.on('end', function() {
		console.log('upload finished...');
	});

});
// List / Delete objects
router.get('/list/', function(req, res) {
    helpers.getBuckets()
  		.then(buckets => {
  			res.render("pages/list", {
		        status: buckets.status,
		        subdirs: [],
		        data: buckets.data.Buckets
		    });
  		})
  		.catch(err => {
  			res.render("pages/list", {
		        status: 404,
		        subdirs: [],
		        data: [],
		        error: "Can't retrive buckets: " + err
		    });
  		});
});
router.get('/list/:bucketname', function(req, res) {
	console.log(req.params.bucketname);
	var folderpath = req.body.folderpath || '';
	console.log(folderpath);
	var data = [];
	
	helpers.listBucketContent(req.params.bucketname)
		.then(bucket => {
			if(bucket.data.CommonPrefixes.length > 0){
				subdirs = bucket.data.CommonPrefixes;
			}
			if(bucket.data.Contents.length > 0){
				contents = bucket.data.Contents;
			}
			console.log(data);
			res.render("pages/list", {
		        status: bucket.status,
		        bucket: req.params.bucketname,
		        subdirs: subdirs,
		        contents: contents,
		    });
		})
		.catch(err => {
			res.render("pages/list", {
		        status: 404,
		        bucket: req.params.bucketname,
		        subdirs: [],
		        error: "Can't retrive buckets: " + err
		    });
		});
});
router.post('/list/:bucketname', function(req, res) {
	console.log(req.params.bucketname);
	console.log(req.body.folderpath);

	helpers.listBucketContent(req.params.bucketname, req.body.folderpath)
		.then(bucket => {
			if(bucket.data.CommonPrefixes.length > 0){
				subdirs = bucket.data.CommonPrefixes;
			}
			if(bucket.data.Contents.length > 0){
				contents = bucket.data.Contents;
			}
			console.log(subdirs);
			console.log(contents);
			res.render("pages/list", {
		        status: bucket.status,
		        bucket: req.params.bucketname,
		        subdirs: subdirs,
		        contents: contents,
		    });
		})
		.catch(err => {
			res.render("pages/list", {
		        status: 404,
		        bucket: req.params.bucketname,
		        subdirs: [],
		        error: "Can't retrive buckets: " + err
		    });
		});
});
// About page to API
router.get('/about', function(req, res) {
    res.render('pages/about');
});

module.exports = router;

