var express = require('express');
var router = express.Router();
const Users = require('../controllers/Users');

/* GET home page. */
router
  .route('/')
  .get(Users.find)
  .post(Users.create)
  .put(Users.update)
  .delete(Users.delete);

// router.get('/', Users.find);
// router.post('/', Users.create);

module.exports = router;
