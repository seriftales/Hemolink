const express = require('express');
const { loginUser, loginHospital } = require('../controllers/login');
const { registerUser } = require('../controllers/register.js');
const { getPriorityRequest } = require('../controllers/priority.js');
const { getActiveRequests, getDonorStatistics, getBloodTypeStatistics } = require('../controllers/statistics.js');
const { getHospitals, getNearbyHospitals } = require('../controllers/hospital.js');
const { createBloodRequest } = require('../controllers/create.js');
const {getRequestForHospital,getRequestForDonor,updateRequest} = require('../controllers/request.js');

const { 
  getUserNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead, 
  getUnreadNotificationCount,
  sendBloodRequestNotification,
  sendTestNotification 
} = require('../controllers/notifications.js');
const auth = require('../middlewares/auth.js');


const router = express.Router();

// Auth routes
router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/hospital-login', loginHospital);
router.get('/hospital', getHospitals);
router.get('/nearby-centers', getNearbyHospitals);
router.post('/create',createBloodRequest) ; 
router.get('/request',getRequestForHospital) ;
router.get('/request',getRequestForDonor) ;
router.put('/update',updateRequest) ;

// Protected routes
router.get('/priority', auth, getPriorityRequest);

// Statistics routes
router.get('/statistics/active-requests', auth, getActiveRequests);
router.get('/statistics/donors', auth, getDonorStatistics);
router.get('/statistics/blood-types', auth, getBloodTypeStatistics);

// Notification routes
router.get('/notifications', auth, getUserNotifications);
router.get('/notifications/unread-count', auth, getUnreadNotificationCount);
router.put('/notifications/:notificationId/read', auth, markNotificationAsRead);
router.put('/notifications/read-all', auth, markAllNotificationsAsRead);
router.post('/notifications/blood-request', auth, sendBloodRequestNotification);
router.post('/notifications/test/:userId', auth, sendTestNotification);

module.exports = router;
