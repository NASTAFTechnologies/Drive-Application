import React, { useEffect, useState, ChangeEvent } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonAvatar, IonButtons, IonIcon, IonInput } from '@ionic/react';
import { useHistory } from "react-router-dom";
import { chevronBackOutline } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router-dom';

import { createOutline, create } from 'ionicons/icons';
import axios from 'axios';
import './Profile.css';

interface ProfileProps extends RouteComponentProps<{ userid: string }> { }

const Profile: React.FC<ProfileProps> = ({ match }) => {
  const { userid } = match.params;
  const history = useHistory();
  const [isEditMode, setIsEditMode] = useState(false);
  const [avatar, setAvatar] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_52W9ux_gz02TW9vR2Wypppvuxycuftej6jD2qm4&s');
  // const [driverData, setDriverData] = useState({});
  // const [loading, setLoading] = useState(true);
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [userData, setUserData] = useState({
    ufirstname: '', // Initialize with empty values
    mobileno: '',
    userpassword: '',
    userconfirmpassword: '',
    email: '',
  });
  const handleBack = () => {
    history.push('/menu/setting');
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const result = readerEvent.target?.result;
      if (result) {
        setAvatar(String(result));
      }
    };
    reader.readAsDataURL(file);
  };
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  const handleSave = () => {
    setShowSaveAlert(true);
  };
  const handleSaveConfirm = async () => {
    try {
      console.log('Edit button clicked');
      await axios.put(`http://localhost:8081/updateProfile/${userid}`, userData);
      console.log('Customer updated');
      setIsEditMode(false);
      setShowSaveAlert(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };
  const handleSaveCancel = () => {
    setShowSaveAlert(false);
  };

  useEffect(() => {
    // Retrieve the logged-in driver's username from local storage
    const loggedInUsername = localStorage.getItem('loggedInUsername');

    // Make an API request to fetch the driver's details based on their username
    // axios.get(`http://localhost:8081/getDriverProfile?username=${loggedInUsername}`)
    // axios.get(`http://localhost:8081/getDriverProfile?username=${loggedInUsername}`)
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
            <img alt="Silhouette of a person's head" src={avatar} />
          </IonAvatar>
          <div className="profile-avatar-overlay">
            <input
              type="file"
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
            <IonLabel position="floating">Name</IonLabel>
            <IonInput name='ufirstname' disabled={!isEditMode}>{userData.ufirstname}</IonInput>
          </IonItem>
          <IonItem className="profile-input">
            <IonLabel position="floating">Mobile Number</IonLabel>
            <IonInput name='mobileno' disabled={!isEditMode}>{userData.mobileno}</IonInput>
          </IonItem>
          <IonItem className="profile-input">
            <IonLabel position="floating">Password</IonLabel>
            <IonInput name='userpassword' type='password' disabled={!isEditMode}>{userData.userpassword}</IonInput>
          </IonItem>
          <IonItem className="profile-input">
            <IonLabel position="floating">Confirm Password</IonLabel>
            <IonInput name='userconfirmpassword' type='password' disabled={!isEditMode}>{userData.userconfirmpassword}</IonInput>
          </IonItem>
          <IonItem className="profile-input">
            <IonLabel position="floating">Email ID</IonLabel>
            <IonInput name='email' disabled={!isEditMode}>{userData.ufirstname}</IonInput>
          </IonItem>
          {isEditMode ? (
            <>
              <IonButton className="profile-save-button" expand="block" onClick={handleSave}>
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
          {/* <IonAlert
            isOpen={showSaveAlert}
            onDidDismiss={handleSaveCancel}
            header="Confirm Save"
            message="Are you sure you want to save the changes?"
            buttons={[
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: handleSaveCancel
              },
              {
                text: 'Save',
                handler: handleSaveConfirm
              }
            ]}
          /> */}
        </div>
      </IonContent>
    </IonPage>
  );
};
export default Profile;
