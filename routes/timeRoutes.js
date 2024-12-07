const express = require('express');
const router = express.Router();
const { createTime, getTime, updateTime, deleteTime } = require('../controller/aboutcontroller/timeController'); 
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth');



router.post('/create', isAuthenticated, authorizeRoles('admin'), createTime);

router.get('/all', isAuthenticated, getTime);

router.put('/update/:id', isAuthenticated, authorizeRoles('admin'), updateTime);

router.delete('/delete/:id', isAuthenticated, authorizeRoles('admin'), deleteTime);

module.exports = router;
