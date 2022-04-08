const Course = require('../models/courses');
const moongseToObject = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    //[GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => res.render('courses/detail', { course: mongooseToObject(course) }))
            .catch(next);
    }
    //[GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //[POST] /courses/store
    store(req, res, next) {
        const course = new Course(req.body);
        course.img = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`;
        course.save().then(res.redirect('/me/stored/courses')).catch(next);
    }

    //[GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findOne({ _id: req.params.id })
            .then((course) => res.render('courses/edit', { course: mongooseToObject(course) }))
            .catch(next);
    }

    //[PUT] /courses/:id
    update(req, res, next) {
        Course.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    //[DELETE] /courses/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('/me/trash/courses'))
            .catch(next);
    }
}

module.exports = new CourseController();
