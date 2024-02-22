
const multer = require('multer');
const MIME_TYPES = ['image/jpg', 'image/png', 'image/jpeg','audio/wav']
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        //console.log("Request IS")
        callback(null, 'D:/reactjs/Akon Templarte/matx-react-master/public/upload');
        //callback(null, '/home/newakon/mrtlive/public/assets/images/upload/audio');
    },
    filename: (req, file, callback) => {
        
        let filename = file.originalname.split(' ').join('-');
        filename = filename.split('.');
        const fileExtension = filename.pop();
        filename = (`${filename.join('-')}-${Date.now()}.${fileExtension}`).toLowerCase();
        //console.log("File NAME IS" + filename)
        callback(null, filename);
    }
})
const fileFilterCB = (req, file, callback) => {
   
    if (MIME_TYPES.includes(file.mimetype)) { 
        return callback(null, true);
    }
    //callback(new Error({ message: 'Please upload Valid File Type', success: 'error' }));
    callback(new ErrorHandler(404, 'Invalid image Type (png/jpg)', 'error'))
}
module.exports = multer({ storage: storage, fileFilter: fileFilterCB });
