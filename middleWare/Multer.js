const multer = require("multer");

//#------------------> Multer Config <------------------#//
module.exports = multer({
    storage: multer.memoryStorage({}),

    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
            return;
        }

        cb(new Error("File type is not supported"), false);
    },
});
