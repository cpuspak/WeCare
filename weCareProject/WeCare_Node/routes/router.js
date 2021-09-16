const express = require('express');
const controller = require('../Controller/controller')

const router = express.Router();

router.post('/users',controller.userRegister);

router.post('/users/login',controller.userLogin);

router.post('/coaches',controller.coachRegister);

router.post('/coaches/login',controller.coachLogin);

router.get('/coaches/all',controller.availableCoaches);

router.get('/coaches/:coachId',controller.coachDetails);

router.get('/users/:userId',controller.userDetails);

router.post('/users/booking/:userId/:coachId',controller.makeAppointment);

router.put('/booking/:bookingId',controller.rescheduleAppointment);

router.delete('/booking/:bookingId',controller.cancelAppointment);

router.get('/coaches/booking/:coachId',controller.coachAppointments);

router.get('/users/booking/:userId',controller.userAppointments);

router.all('*',controller.invalidPath);

module.exports = router;
