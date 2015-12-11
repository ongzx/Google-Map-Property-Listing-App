var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 	res.sendfile('./public/app/index.html');
  	// res.render('./public/index.html', { title: 'Express' });
});

module.exports = router;
