const express = require('express');
const CourseController = require('../app/controllers/CourseController');
const router = express.Router();
const meController = require('../app/controllers/MeController');

router.post('/trash/handle-form-action', meController.handleTrashFormAction);
router.post('/handle-form-action', meController.handleFormAction);
router.delete('/:id/remove', meController.remove);
router.patch('/:id/restore', meController.restore);
router.get('/stored/courses', meController.store);
router.get('/trash/courses', meController.trash);
module.exports = router;
