import React, { useEffect, useState, ChangeEvent } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonCheckbox, IonContent, useIonToast, IonButton, IonItem, IonLabel, IonAvatar, IonButtons, IonIcon, IonInput } from '@ionic/react';
import { useHistory } from "react-router-dom";
import { chevronBackOutline } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router-dom';
import { createOutline, create } from 'ionicons/icons';
import axios from 'axios';
import './Profile.css';
interface ProfileProps extends RouteComponentProps<{ username: string }> { }
const Profile: React.FC<ProfileProps> = ({ match }) => {
  const { username } = match.params;
  const history = useHistory();
  const [present] = useIonToast();
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileImagePath, setProfileImagePath] = useState('');
  const [userData, setUserData] = useState({
    ufirstname: '', // Initialize with empty values
    mobileno: '',
    userpassword: '',
    userconfirmpassword: '',
    email: '',
    avatar: '', // Add the 'avatar' property here
  });
  const handleBack = () => {
    history.push('/menu/setting');
  };


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const loggedInUsername = localStorage.getItem('loggedInUsername');
    if (!loggedInUsername) {
      console.error('Logged-in username not found');
      return;
    }
    const formData = new FormData();
    formData.append('avatar', file);
    // Send the image data to the server
    axios.post(`http://localhost:8081/uploadProfilePhoto?username=${loggedInUsername}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log('Profile photo uploaded successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error uploading profile photo:', error);
      });
  };
  //get profile photo from database
  useEffect(() => {
    const loggedInUsername = localStorage.getItem('loggedInUsername');
    if (loggedInUsername) {
      axios.get(`http://localhost:8081/profile_photos?username=${loggedInUsername}`)
        .then((response) => {
          const profileImagePath = response.data.profileImagePath.replace(/\\/g, '/');
          console.log('Profile Image Path:', profileImagePath);
          setProfileImagePath(profileImagePath);
          console.log('summa path kattu', profileImagePath);
        })
        .catch((error) => {
          console.error('Error fetching profile photo path:', error);
        });
    }
  }, []);

  //end

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  const presentToast = (position: 'top' | 'middle' | 'bottom') => {
    present({
      message: 'Your Duty Was Started !',
      duration: 1500,
      position: position,
    });
  };
  const handleUpdateduty = () => {
    const username = localStorage.getItem('loggedInUsername');
    const updatedData = {
      username: username,
      ufirstname: userData.ufirstname,
      mobileno: userData.mobileno,
      userpassword: userData.userpassword,
      userconfirmpassword: userData.userconfirmpassword,
      email: userData.email,
    };
    console.log(updatedData);
    axios
      .post('http://localhost:8081/update_updateprofile', updatedData)
      .then((response) => {
        console.log('Update successful:', response.data);
        presentToast('top');
      })
      .catch((error) => {
        console.error('Error updating status:', error);
        presentToast('top');
      });
  };
  const handleInputChange = (e: CustomEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    console.log(`Input Name: ${name}, Input Value: ${value}`);
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  useEffect(() => {
    const loggedInUsername = localStorage.getItem('loggedInUsername');
    axios.get(`http://localhost:8081/getDriverProfile?username=${loggedInUsername}`)
      .then((response) => {
        const driverProfile = response.data;
        setUserData(driverProfile);
      })
      .catch((error) => {
        console.error('Error fetching driver profile:', error);
      });
  }, []);
  return (
    <IonPage className="profile-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleBack} className="profile-back-button">
              <IonIcon icon={chevronBackOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className='Avatar'>
          <IonAvatar className="profile-avatar">
            <img src={`../../../../Backend/server/${profileImagePath}`} />
          </IonAvatar>
          <div className="profile-avatar-overlay">
            <input
              type="file"
              name='avatar'
              accept="image/*"
              onChange={handleFileChange}
              hidden
              id="avatar-upload-input"
            />
            <IonButton style={{ color: "#000" }} fill="clear" size="small" className="profile-avatar-edit-button" onClick={() => document.getElementById('avatar-upload-input')?.click()}>
              <IonIcon slot="icon-only" icon={createOutline}></IonIcon>
            </IonButton>
          </div>
        </div>
        <div className="input-container">
          <IonItem className="profile-input">
            <IonInput label='Name' name='ufirstname' onIonChange={handleInputChange} value={userData.ufirstname} disabled={!isEditMode}></IonInput>
          </IonItem>
          <IonItem className="profile-input">
            <IonInput label='Mobile Number' name='mobileno' onIonChange={handleInputChange} value={userData.mobileno} disabled={!isEditMode}></IonInput>
          </IonItem>
          <IonItem className="profile-input">
            <IonInput label='Password' name='userpassword' type='password' onIonChange={handleInputChange} value={userData.userpassword} disabled={!isEditMode}></IonInput>
          </IonItem>
          <IonItem className="profile-input">
            <IonInput label='Confirm Password' name='userconfirmpassword' onIonChange={handleInputChange} value={userData.userconfirmpassword} type='password' disabled={!isEditMode}></IonInput>
          </IonItem>
          <IonItem className="profile-input">
            <IonInput label='Email ID' name='email' value={userData.email} onIonChange={handleInputChange} disabled={!isEditMode}></IonInput>
          </IonItem>
          <IonItem>
            <IonCheckbox aria-required disabled={!isEditMode} />
            Above Mentioned value are correct
          </IonItem>
          {isEditMode ? (
            <>
              <IonButton className="profile-save-button" expand="block" onClick={handleUpdateduty}>
                Save
              </IonButton>
              <IonButton fill="clear" size="small" onClick={toggleEditMode}>
                Cancel
              </IonButton>
            </>
          ) : (
            <IonButton fill="clear" size="small" onClick={toggleEditMode}>
              Edit
              <IonIcon slot="end" icon={create}></IonIcon>
            </IonButton>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};
export default Profile;
