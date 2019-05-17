const router = require('express').Router();

var awss3Controller = require('../controllers/awss3.controller');
router.route('/s3')
	.get(awss3Controller.index)
	.post(awss3Controller.create)
	.put(awss3Controller.upload);

router.route('/s3/bucket/:bucketname')
	.get(awss3Controller.listone)
	.post(awss3Controller.listfolders)
	.patch(awss3Controller.emptybucket)
	.delete(awss3Controller.delete);

router.route('/s3/object/delete/:bucketname/:filename')
	.delete(awss3Controller.deletefile);

router.route('/s3/object/delete/:bucketname')
	.delete(awss3Controller.deletefiles);

module.exports = router;
