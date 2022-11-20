var express = require('express');
var router = express.Router();
// const authenticate = require('../middleware/auth.js')
const control = require('../controllers/adminControllers.js')

router.get('/', function(req, res, next) {
    res.send('Hello from Profile');
});

router.post('/login',control.login)

router.put('/changePassword',control.changePassword)
router.post('/updateUser',control.UpdateUser)
router.get('/getAdmin',control.getAdmin)
router.post('/detection',control.Detection_)
router.get('/getDetection',control.GetDetection)
router.post('/notification',control.Notification_)
router.get('/getNotification',control.GetNotification)
router.delete('/deleteNotification',control.DeleteNotification)
router.delete('/deleteDetection',control.DeleteDetection)
router.post('/addNotifier',control.AddNotifier)
router.get('/getNotifier',control.GetNotifier)
router.delete('/deleteNotifier',control.DeleteNotifier)
router.get('/getAllRecords',control.GetAllRecords)
router.post('/reset-password',control.ResetPassword)
router.post('/liveStream',control.LiveStream)
router.post('/searchDetection',control.SearchDetection)
router.post('/getUpdateNotifier',control.GetUpdateNotifier)
router.put('/updateNotifier',control.UpdateNotifier)
module.exports = router;