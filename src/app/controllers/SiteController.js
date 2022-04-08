const Course = require('../models/courses');
const { mongooseArrayToObject } = require('../../util/mongoose');
class SiteController {
    //[GET] /
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('home', { courses: mongooseArrayToObject(courses) });
            })
            .catch(
                // error => next(error)
                next,
            );
    }
    //[GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
