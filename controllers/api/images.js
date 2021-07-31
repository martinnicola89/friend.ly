const Profile = require('../../models/profile');
var aws = require('aws-sdk')
var express = require('express')
var multer = require('multer')
var multerS3 = require('multer-s3');
const {uuid} = require('uuidv4')



const region = "ca-central-1"
const bucketName = "friend.ly.mkd"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'friend.ly.mkd',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, req.s3Key)
      }
    })
  })


  const singleFileUpload = upload.single('image')

  function  uploadToS3 (req, res){
      req.s3Key = uuid();
      let downloadUrl = `https://s3.ca-central-1.amazonaws.com/friend.ly.mkd/${req.s3Key}`
    return new Promise((resolve,reject)=>{
        return singleFileUpload(req,res, err => {
            if (err) return reject(err);
            return resolve(downloadUrl)
        })
    })
  }
module.exports = {
    uploadImage,
  };

function uploadImage(req, res){

    console.log('we get hereee!')
    uploadToS3(req, res)
    .then(downloadUrl => {
        console.log("req.params.id", req.params)
        
       
        // Profile.findOne({user: user}, function (err, profile) {
        //     profile.imageUrl = downloadUrl;
        //     profile.save();
        //   });
        // db.update({
        //     TableName: "Profile",
        //     id: req.user._id,
        //     imageUrl: downloadUrl
        // })
        // .then(() => res.status(200).send({downloadUrl}))
        // let profile = Profile.update({
        //     user: req.user._id,
        //     imageUrl: downloadUrl
        // }

        // ).then(() => res.status(200).send({profile}))
        return res.status(200).send({downloadUrl})
    })
}