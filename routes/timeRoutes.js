const express = require('express');
const router = express.Router();
const { createTime, getTime, updateTime, deleteTime } = require('../controller/aboutcontroller/timeController'); 
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth');



router.post('/create', isAuthenticated, createTime);

router.get('/timeall', getTime);

router.put('/update/:id', isAuthenticated, updateTime);

router.delete('/delete/:id', isAuthenticated, authorizeRoles('admin'), deleteTime);

module.exports = router;
