import { Component } from 'react';
import ImageUploader from 'react-images-upload';
import axios from 'axios'

export default class ProfilePageForm extends Component {

  state = {
    user: this.props.user,
    bio: "",
    interests: "",
    friends: "",
    pictures: [],
  };

 

  constructor(props) {
    super(props);
    console.log("constructor props", props)
     this.state = { pictures: [] };
     this.onDrop = this.onDrop.bind(this);
     this.uploadImages = this.uploadImages.bind(this)
}

onDrop(picture) {
    this.setState({
        pictures: this.state.pictures.concat(picture),
    });
}

//with each image name we do axios calls (POST)
uploadImages(){
  console.log(this.state.pictures)

  let uploadPromises = this.state.pictures.map(image => {
    let data = new FormData();
    data.append('image', image, image.name)
    return axios.post(`/api/users/profile/uploadImage`, data)
  })
  axios.all(uploadPromises)
  .then(images => {
    console.log('server response: ')
console.log(images)
  })
}


  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    }


    
        
          
   
  handleSubmit = async () => {

    try {
      let jwt = localStorage.getItem('token')
      await fetch("/api/users/profile", {
        method: "POST",
        headers: {"Content-Type": "application/json",'Authorization': 'Bearer ' + jwt},
        body: JSON.stringify({bio: this.state.bio, interests: this.state.interests, friends: this.state.friends, imageUrl: this.state.pictures[1]}) // <-- send this object to server
        })
        this.props.getProfile()
    } catch (err) {
      console.error("Error:", err) // <-- log if error
    }

  }

  render() {
    return(
      <div>
        <hr />
        Bio:
        <textarea
          rows="2"
          name="bio"
          onChange={this.handleChange}
          value={this.state.bio}></textarea>
        <br />
        Interests:
        <textarea
          rows="2"
          name="interests"
          onChange={this.handleChange}
          value={this.state.interests}></textarea>
        Friends:
        <textarea
          rows="2"
          name="friends"
          onChange={this.handleChange}
          value={this.state.friends}></textarea>
          <ImageUploader
              key="image-uploader"
              withIcon={true}
              singleImage={true}
              withPreview={true}
              label="Maximum size file: 5MB"
              buttonText="Choose an image"
              onChange={this.onDrop}
              imgExtension={['.jpg', '.png', '.jpeg']}
              maxFileSize={5242880}
          />
          <button onClick={this.uploadImages}>Upload</button><br></br>
        <button onClick={this.handleSubmit}>Submit!</button>
      </div>
    )
  }
}