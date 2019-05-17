const config = require('../config/config');
const request = require('request');
var helpers = {};

// Helper function to listing
helpers.getBuckets = function getBuckets(){
	return new Promise((resolve, reject) => {
		const options = {
		  uri: config.api_url + 's3',
		  json: true,
		  port: config.port,
		  path: '/',
		  method: 'GET',
		}
		request(options, (error, response, body) => {
		    if (error) {
		        // Reject the Promise with an error
		    	return reject(error)
		    }

		    return resolve(body)
		});
	});
}

helpers.listBucketContent = function listBucketContent(bucketname, folderpath=''){
	return new Promise((resolve, reject) => {
		const options = {
		  uri: config.api_url + 's3/bucket/' + bucketname,
		  json: true,
		  port: config.port,
		  path: '/',
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/x-www-form-urlencoded',
		  },
		  body: "folderpath=" + folderpath,
		}
		console.log(options);
		request(options, (error, response, body) => {
		    if (error) {
		        // Reject the Promise with an error
		    	return reject(error)
		    }

		    return resolve(body)
		});
	});
}

helpers.createBucket = function createBucket(bucketName){
	return new Promise((resolve, reject) => {
		const options = {
		  uri: config.api_url + 's3',
		  json: true,
		  port: config.port,
		  path: '/',
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/x-www-form-urlencoded',
		  },
		  body: "bucketname=" + bucketName,
		}

		request(options, (error, response, body) => {
		  if (error) {
		        // Reject the Promise with an error
		    	return reject(error)
		    }

		    return resolve(body)
		});
	});
}

helpers.deleteBucket = function createBucket(bucketName){
	return new Promise((resolve, reject) => {
		const options = {
		  uri: config.api_url + 's3/bucket/' + bucketName,
		  port: config.port,
		  path: '/',
		  method: 'DELETE',
		}
		request(options, (error, response, body) => {
		  	if (error) {
		        // Reject the Promise with an error
		    	return reject(error)
		    }

		    return resolve(body)
		});
	});
}

helpers.uploadObject = function uploadObject(bucketName, fileName, folderPath){
	return new Promise((resolve, reject) => {
		const options = {
		  uri: config.api_url + 's3/',
		  port: config.port,
		  method: 'PUT',
		  headers: {
		    'Content-Type': 'application/x-www-form-urlencoded',
		  },
		  body: "bucketname=" + bucketName + "&filename=" + fileName +  "&folderpath=" + folderPath,
		}

		request(options, (error, response, body) => {
		  	if (error) {
		        // Reject the Promise with an error
		    	return reject(error)
		    }

		    return resolve(body)
		});
	});
}

module.exports = helpers;