const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;

const courseSchema = new Schema(
    {
        name: { type: String, required: true },
        des: { type: String },
        img: { type: String },
        slug: { type: String, slug: 'name', unique: true },
        videoId: { type: String, required: true },
    },
    { timestamps: true },
);

// plugins
mongoose.plugin(slug);
courseSchema.plugin(mongooseDelete, { deletedAt: true });
courseSchema.plugin(mongooseDelete, { overrideMethods: 'all' });

module.exports = mongoose.model('Course', courseSchema);
