const Profile = require('../../models/profile');

module.exports = {
    create,
    index,
    decisionIndex,
  };
  
  async function create(req, res) {
    try {
      const profile = await Profile.create({bio: req.body.bio, interests: req.body.interests, friends: req.body.friends, user: req.user});
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
      console.log("profiles", profiles)
      let otherProfiles = []
      for (let profile of profiles) {
        if (profile.user != req.user._id) {
          otherProfiles.push(profile);
        }
      }
      console.log("otherProfiles", otherProfiles)
      res.status(200).json(otherProfiles);
    } catch (err) {
      res.status(400).json(err);
    }
  }