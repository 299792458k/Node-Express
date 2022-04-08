// khi truyen courses trong handlebars se khong tra ve object
// (ly do bao mat) => phai chuyen ve object
module.exports = {
    mongooseArrayToObject(mongooses) {
        return mongooses.map((mongoose) => mongoose.toObject());
    },
    mongooseToObject(mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
};
