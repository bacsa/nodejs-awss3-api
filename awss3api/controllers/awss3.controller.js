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
	  ACL : process.env.AWS_ACL,
	  CreateBucketConfiguration: {
	  	LocationConstraint: process.env.AWS_REGION_DEFAULT,
	  },
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
	var uploadParams = {
		Bucket: req.body.bucketname, 
		Key: req.body.folderpath, 
		Body: '',
		ACL : process.env.AWS_ACL,
	  	CreateBucketConfiguration: {
	  		LocationConstraint: process.env.AWS_REGION_DEFAULT,
	  	},
	};
	var file = req.body.filename;

	// Configure the file stream and obtain the upload parameters
	var fs = require('fs');
	var fileStream = fs.createReadStream(file);
	fileStream.on('error', function(err) {
	  console.log('File Error', err);
	});
	uploadParams.Body = fileStream;
	var path = require('path');
	uploadParams.Key = (uploadParams.Key || '') + path.basename(file);

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

exports.listfolders = function(req, res){
	// Create the parameters for calling listObjects
	var bucketParams = {
	  Bucket : req.params.bucketname,
	  MaxKeys: 200,
      Delimiter: '/',
      Prefix: req.body.folderpath || '',
	};

	// Call S3 to obtain a list of the objects in the bucket
	s3.listObjectsV2(bucketParams, function(err, data) {
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

exports.deletefile = function(req, res){
	console.log(req.params);
	var params = {
		Bucket: req.params.bucketname, 
		Key: req.params.filename,
	};

	s3.deleteObject(params, function(err, data) {
	  if (err){
	  		res.json({
				status: 404,
				message: err
			});
	  	}else{
	  		res.json({
				status: 200,
				message: 'Files deleted!',
				data: data
			});
	  	}
	});
};

exports.deletefiles = function(req, res){
	var params = {
		Bucket: req.params.bucketname,
		Delete: { // required
			Objects: [ // required
		      	{
		        	Key: 'app.js' // required
		      	},
		      	{
		        	Key: 'package.json'
		      	}
	    	],
	  	},
	};

	s3.deleteObjects(params, function(err, data) {
	  if (err){
	  		res.json({
				status: 404,
				message: err
			});
	  	}else{
	  		res.json({
				status: 200,
				message: 'Files deleted!',
				data: data
			});
	  	}
	});
};

exports.emptybucket = function(req, res){
	var params = {
	    Bucket: req.params.bucketname,
	    Prefix: ''
	};

	s3.listObjects(params, function(err, data) {
	    if (err){
	  		res.json({
				status: 404,
				message: err
			});
	  	}else{
	  		if (data.Contents.length == 0){
	  			res.json({
					status: 200,
					message: 'Bucket alredy empty!',
					data: data
				});
	  		}else{
	  			params = {Bucket: req.params.bucketname};
			    params.Delete = {Objects:[]};

			    data.Contents.forEach(function(content) {
			      params.Delete.Objects.push({Key: content.Key});
			    });

			    s3.deleteObjects(params, function(err, data) {
			    	if(err){
						res.json({
							status: 404,
							message: err
						});
			    	}else{
			    		if(data.Content != undefined && data.Contents.length == 1000){
			    			exports.emptybucket(req, res);
			    		}else{
			    			res.json({
								status: 200,
								message: 'Bucket emptied!',
								data: data
							});
			    		}
			    	}
			    });
	  		}
	  	}
	});
};


