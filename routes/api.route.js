const router = require('express').Router();

var awss3Controller = require('../controllers/awss3.controller');
router.route('/s3')
	.get(awss3Controller.index)
	.post(awss3Controller.create)
	.put(awss3Controller.upload);

router.route('/s3/:bucketname')
	.get(awss3Controller.listone)
	.delete(awss3Controller.delete);

module.exports = router;
