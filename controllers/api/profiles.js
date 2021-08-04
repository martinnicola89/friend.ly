const Profile = require('../../models/profile');

module.exports = {
    create,
    index,
    decisionIndex,
    show,
    update: updateProfile,
  };
  
  async function create(req, res) {
    try {
      const profile = await Profile.create({
        name: req.user.name, 
        bio: req.body.bio, 
        
        interests: req.body.interests, 
        friends: req.body.friends, 
        user: req.user,
        imageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      
      });
      res.status(200).json("created!"); // send it to the frontend
    } catch (err) {
      res.status(400).json(err);
    }
  }
  
  async function index(req, res) {
    try {
      let profile = await Profile.findOne({user: req.user._id});
      res.status(200).json(profile);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  async function decisionIndex(req, res) {
    try {
      let profiles = await Profile.find({});
      let otherProfiles = []
      for (let profile of profiles) {
        if (profile.user != req.user._id) {
          otherProfiles.push(profile);
        }
      }
      res.status(200).json(otherProfiles);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  async function show(req, res) {
    try {

      let profile = await Profile.find({user: req.params.id});
      res.status(200).json(profile[0].imageUrl);
    } catch(err) {
      res.status(400).json(err);
    }
  }  

  async function updateProfile(req,res) {
            try{
                  let profile = await Profile.findById(req.params.id)
                  profile.bio=req.body.bio
                  profile.interests=req.body.interests
                  profile.save()
                  res.status(200).json("updatedP")
            } catch(err){
                  res.status(400).json(err);
            }
}