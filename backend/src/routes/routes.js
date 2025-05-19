const express = require('express');
const { loginUser, logOutUser } = require('../controllers/login.js');
const { registerUser } = require('../controllers/register.js');
const { getPriorityRequest } = require('../controllers/priority.js');
const { getActiveRequests, getDonorStatistics, getBloodTypeStatistics } = require('../controllers/statistics.js');
const { 
  getUserNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead, 
  getUnreadNotificationCount,
  sendBloodRequestNotification 
} = require('../controllers/notifications.js');
const auth = require('../middlewares/auth.js');

const router = express.Router();

// Auth routes
router.post('/login', loginUser);
router.post('/logout', logOutUser);
router.post('/register', registerUser);

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

module.exports = router;
