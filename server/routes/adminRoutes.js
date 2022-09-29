var express = require('express');
var router = express.Router();
const control = require('../controllers/adminControllers.js')

router.get('/', function(req, res, next) {
    res.send('Hello from Profile');
});

router.post('/login',control.login)
router.put('/changePassword',control.changePassword)
router.post('/updateUser',control.UpdateUser)
router.get('/getAdmin',control.getAdmin)
module.exports = router;