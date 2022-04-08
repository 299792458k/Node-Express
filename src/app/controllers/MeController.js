const Course = require('../models/courses');
const { mongooseArrayToObject } = require('../../util/mongoose');
const sortMiddleware = require('../Middleware/SortMiddleware');
class MeController {
    //[GET] /me/stored/courses
    store(req, res, next) {
        const myCourses = Course.find();
        sortMiddleware(req, res, next);
        if (req.query.hasOwnProperty('_sort')) {
            myCourses.sort({
                [req.query.col]: req.query.type,
            });
        }
        Promise.all([myCourses, Course.countDeleted()])
            .then(([courses, countDeleted]) =>
                res.render('me/courses', {
                    courses: mongooseArrayToObject(courses),
                    countDeleted: countDeleted,
                }),
            )
            .catch(next);
    }

    //[GET] /me/trash/courses
    trash(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render('me/trash/courses', { courses: mongooseArrayToObject(courses) }),
            )
            .catch(next);
    }

    //[PATCH] /me/
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    //[DELETE] /me/:id/remove
    remove(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/me/trash/courses'))
            .catch(next);
    }

    //[POST] /me/handle-form-handleFormAction
    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseItemCheckbox } })
                    .then(() => res.redirect('/me/stored/courses'))
                    .catch(next);
                break;
            default:
                res.send('Invalid action');
        }
    }
    //[POST] /me/trash/handle-form-action
    handleTrashFormAction(req, res, next) {
        switch (req.body.action) {
            case 'remove':
                Course.deleteOne({ _id: { $in: req.body.courseItemCheckbox } })
                    .then(() => res.redirect('/me/trash/courses'))
                    .catch(next);
                break;
            case 'restore':
                Course.restore({ _id: { $in: req.body.courseItemCheckbox } })
                    .then(() => res.redirect('/me/stored/courses'))
                    .catch(next);
                break;
            default:
                res.send('Invalid action');
        }
    }
}

module.exports = new MeController();
