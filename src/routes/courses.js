const express = require('express');
const router = express.Router();
const CourseController = require('../app/controllers/CourseController');

//softdelete
router.delete('/:id', CourseController.delete);
// router.patch('/:id/')
router.put('/:id', CourseController.update);
router.post('/store', CourseController.store);
router.get('/create', CourseController.create);
router.get('/:id/edit', CourseController.edit);
router.get('/:slug', CourseController.show);
module.exports = router;
