const express = require('express');
const router = express.Router();
const profilesCtrl = require('../../controllers/api/profiles');
const imgCtrl = require('../../controllers/api/images')



// POST /api/users/signup

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "./public/uploads/images")
//     },
//     filename: function (request, file, callback) {
//         callback(null, Date.now() + file.originalname);
//       },
//     });


// const upload = multer({
//     storage: storage,
//     limits: {
//       fieldSize: 1024 * 1024 * 3,
//     },
//   });
  

router.post('/',  profilesCtrl.create);
router.get('/', profilesCtrl.index);
router.get('/decision', profilesCtrl.decisionIndex);
router.use(require('../../config/auth'));
router.post('/:userId/uploadImage', imgCtrl.uploadImage)

// POST /api/users/login

module.exports = router;