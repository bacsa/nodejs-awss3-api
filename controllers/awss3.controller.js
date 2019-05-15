// Load the SDK and UUID
var AWS = require('aws-sdk');

// Create a promise on S3 service object
var s3 = new AWS.S3({apiVersion: '2006-03-01', region: process.env.AWS_REGION_DEFAULT});
// List all buckets
exports.index = function(req, res) {
	s3.listBuckets(function(err, data) {
		if (err){
	  		res.json({
				status: 404,
				message: err
			});
	  	}else{
	  		res.json({
				status: 200,
				message: 'Buckets retrived succesfully',
				data: data
			});
	  	}
	});
};
// Create new bucket if not exists
exports.create = function(req, res){
	// Create the parameters for calling createBucket
	var bucketParams = {
	  Bucket: req.body.bucketname,
	  ACL : 'public-read'
	};

	// call S3 to create the bucket
	s3.createBucket(bucketParams, function(err, data) {
	    if (err){
	  		res.json({
				status: 404,
				message: err
			});
	  	}else{
		 	res.json({
				status: 200,
				message: 'New Bucket created succesfully',
				data: data
			});
	  	}
	});
};

exports.upload = function(req, res){
	// call S3 to retrieve upload file to specified bucket
	var uploadParams = {Bucket: req.body.bucketname, Key: '', Body: ''};
	var file = req.body.filename;

	// Configure the file stream and obtain the upload parameters
	var fs = require('fs');
	var fileStream = fs.createReadStream(file);
	fileStream.on('error', function(err) {
	  console.log('File Error', err);
	});
	uploadParams.Body = fileStream;
	var path = require('path');
	uploadParams.Key = path.basename(file);

	// call S3 to retrieve upload file to specified bucket
	s3.upload (uploadParams, function (err, data) {
	  	if (err){
	  		res.json({
				status: 404,
				message: err
			});
	  	}else{
		 	res.json({
				status: 200,
				message: 'File uploaded succesfully',
				data: data
			});
	  	}
	});
};

exports.listone = function(req, res){
	console.log(req.params.bucketname);
	// Create the parameters for calling listObjects
	var bucketParams = {
	  Bucket : req.params.bucketname,
	};

	// Call S3 to obtain a list of the objects in the bucket
	s3.listObjects(bucketParams, function(err, data) {
	  	if (err){
	  		res.json({
				status: 404,
				message: err
			});
	  	}else{
		 	res.json({
				status: 200,
				message: 'Bucket retrieve succesfully',
				data: data
			});
	  	}
	});
};

exports.delete = function(req, res){
	// Create params for S3.deleteBucket
	var bucketParams = {
	  Bucket : req.params.bucketname
	};

	// Call S3 to delete the bucket
	s3.deleteBucket(bucketParams, function(err, data) {
	  	if (err){
	  		res.json({
				status: 404,
				message: err
			});
	  	}else{
		 	res.json({
				status: 200,
				message: 'Bucket deleted succesfully',
				data: data
			});
	  	}
	});
};


