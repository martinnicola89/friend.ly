import React from 'react';
import ProfilePageForm from '../../components/ProfilePageForm/ProfilePageForm';
import ProfileData from '../../components/ProfileData/ProfileData'

import ImageUploader from 'react-images-upload';
import axios from 'axios'

export default class ProfilePage extends React.Component {
    
    state = {
        userData: {},
        profileData: null,
      }
    

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
    uploadImages(e){ 
      e.preventDefault();
      console.log(this.state.pictures)
    
      let uploadPromises = this.state.pictures.map(image => {
        let data = new FormData();
        data.append('image', image, image.name)
        return axios.post(`/api/users/profile/${this.state.profileData._id}/uploadImage`, data)
      })
      axios.all(uploadPromises)
      .then(images => {
        console.log('server response: ')
    console.log(images)
      })
    }

      getProfile = async () => {
        let jwt = localStorage.getItem('token')
          let fetchProfileDataResponse = await fetch('/api/users/profile', {headers: {'Authorization': 'Bearer ' + jwt}})
          if (!fetchProfileDataResponse.ok) throw new Error("Couldn't fetch orders")
          let profile = await fetchProfileDataResponse.json() // <------- convert fetch response into a js object
          this.setState({ profileData: profile})
      }

      async componentDidMount() {
        try {
          let jwt = localStorage.getItem('token')
          let fetchUserDataResponse = await fetch('/api/users/userdata', {headers: {'Authorization': 'Bearer ' + jwt}})
          if (!fetchUserDataResponse.ok) throw new Error("Couldn't fetch orders")
          let userD = await fetchUserDataResponse.json() // <------- convert fetch response into a js object
          this.setState({ userData: userD})
          this.getProfile();
        } catch (err) {
          console.error('ERROR:', err) // <-- log if error
        }
      }

    render() {
        return (
            <>
                <h1>profile</h1>
                <h2>{this.state.userData?.name}</h2>
                <h2>{this.state.userData?.email}</h2>
                {this.state.profileData ? 
                <>
                  <ProfileData profileData={this.state.profileData}/>
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
          <button onClick={this.uploadImages}>Upload</button>
          </>
                :
                <ProfilePageForm getProfile={this.getProfile}/>
                }
            </>
        )
    }
}