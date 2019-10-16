var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(res)
  console.log(req)
  res.render('index', { title: 'Name' });
  console.log('index',res)
  res.end();
});

module.exports = router;
