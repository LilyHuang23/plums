import { rejects } from "assert";
import { config } from "process";

const methodOverride = require('method-override');
const multer = require('multer');
const GridFsStorage = require('multer-grids-storage');
// https://www.freecodecamp.org/news/gridfs-making-file-uploading-to-mongodb/
const storage = new GridFsStorage({
    url: config.mongoURI,
    file: (req, file) => {
        return new Promise((resolve, rejects) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err)
                {
                return reject(err);
                }
                const filename = buf .toString( 'hex') + path.extname (file.originalname) ;
                const fileInfo = {
                filename: filename, bucketName: 'uploads'
                };
                resolve(fileInfo);
                });
                });
                }
                });
const upload = multer({ storage });

// server-side: routes/image.js
// initialize gridfs stream
const url = config. mongoURI;
const connect = mongoose. createConnection(url, {
useNewUrlParser: true, useUnifiedTopology: true
});
let gfs;
connect.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: "uploads"
    });
});

// server-side: routes/image. js
// upload middleware initialized with gridfs
// for storing a single file/ image
/*
POST: Upload a single image/file to Image collection
*/
imageRouter.route('/')
•post (upload.single('file'), (req, res, next) => { console. log(req.body);
// check for existing images
Image. findOne({ caption: req.body.caption })
.then ( ( image) => {
console. log( image);
if (image) {
return res.status(200).json( {
success: false,
message: 'Image already exists'
});
}
let newImage = new Image {
caption: req.body. caption, filename: req. file. filename, fileld: req. file.id,
});
newImage. save ( )
    .then((image) => {
        res.status (200).json( {
            success: true, image,
            });
            })
            •catch(err => res.status (500) • json(err) ) ;
            })
            •catch(err => res.status (500) . json(err)) ;
            })
            // server-side: routes/image. js
// upload middleware initialized with gridfs
// for storing multiple images/files
// * POST: Upload multiple files upto 3
imageRouter.route('/multiple')
    •post (upload.array('file', 3), (req, res, next) => {
        res.status (200). json( {
            success: true,
            message: `${req.files.length} files uploaded successfully`,
        });
    });
// server-side: routes/image.js
// using GridFS stream to fetch all the files
/*
GET: Fetches all the files in the uploads collection
*/ imageRouter.route('/files')
•get ((req, res, next) => {
gfs.find(). toArray((err, files) => {
if (!files I| files. length === 0) {
return res.status (200) . json({
success: false,
message: 'No files available'
});
    }
    //Fetch all Files From Database
    //server-side: app.]s    
// image formats supported: [jpg, png, svg]
files.map(file => {
    if (file.contentType ===
    'image/ jpeg'
    11 file.contentType === ' image/png'
    ¡I file. contentType === 'image/svg+xml') {
    file. isImage = true;
    } else {
    file. isImage = false;
    }
    });
    res.status (200) . json( {
    success: true, files,
    });
    });
    });

// Fetch a Single File By Filename
    // server-side: routes/image.js
// using GridFS stream to fetch a single file
/*
GET: Fetches a particular file by filename
*/
imageRouter.route('/file/: filename')
    .get((req, res, next) => {
        gfs.find({ filename: req.params.filename })
            .toArray((err, files) => {
                if (!files [0] |1 files. length === 0) {
                    return res.status (200).json( {
                        success: false,
                        message: 'No files available'
                });
                }
                res.status(200).json({
                    success: true,
                    file: files[0],
                });
});
});
// server-side: routes/image. js
// using GridFS to render a particular image on browser
/*
GET: Fetches a particular image and render on browser
*/
imageRouter .route(' / image/: filename' )
    .get ( (reg, res, next) => {
        gfs. find({ filename: req.params. filename }). toArray( (err, files) => {
            if (!files [0] || files. length === 0) {
            return res.status (200) • json({
            success: false, message:
                    'No files available',
                });
            }
            
        if (files[0].contentType === ' image/ jpeg'
            || files[0].contentType === ' image/png'
            || files[0].contentType === 'image/svg+xml') {
            // render image to browser
            gfs.openDownloadStreamByName(req params.filename).pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an image'
            });
        }
        }); 
    });
// server-side: routes/image. js
// using GridFS stream to delete a particular file/ image
/*
DELETE: Delete a particular file by an ID
*/
imageRouter.route('/file/del/: id' )
    .post((reg, res, next) => {
        console.log(req params.id);
        gfs.delete(new mongoose. Types. ObjectId(req-params. id) ,
            (err, data) =>{
                if (err) {
                return res.status(404).json({ err: err });
                }
                
                res.status(200).json({
                    success: true,
                    message: `File with ID ${reg.params. id} is deleted`,
                });
    });
});