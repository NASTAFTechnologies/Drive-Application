import React, { useEffect, useState, ChangeEvent } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonAvatar, IonButtons, IonIcon, IonInput } from '@ionic/react';
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [avatar, setAvatar] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_52W9ux_gz02TW9vR2Wypppvuxycuftej6jD2qm4&s');
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
  const handleSave = async () => {
    const loggedInUsername = localStorage.getItem('loggedInUsername');
    try {
      console.log('Edit button clicked');
      // Create a new object with only the fields you want to update
      const updatedFields = {
        ufirstname: userData.ufirstname,
        mobileno: userData.mobileno,
        userpassword: userData.userpassword,
        userconfirmpassword: userData.userconfirmpassword,
        email: userData.email,
      };
      const response = await axios.put(`http://localhost:8081/updateProfile`, updatedFields, {
        params: { username: loggedInUsername }
      });
      console.log('Server Response:', response.data);
      if (response.data && response.data.ufirstname && response.data.mobileno && response.data.userpassword && response.data.userconfirmpassword && response.data.email) {
        setUserData(response.data); // Update state with the response data
        setIsEditMode(false);
      } else {
        console.error('Unexpected server response:', response.data);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };
  const handleInputChange = (e: CustomEvent) => {
    const { name, value } = e.detail;
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
        </div>
      </IonContent>
    </IonPage>
  );
};
export default Profile;
