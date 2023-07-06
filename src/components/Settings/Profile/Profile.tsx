import React, { useEffect, useState, ChangeEvent } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonAvatar, IonButtons, IonIcon, IonBackButton, IonInput, IonAlert } from '@ionic/react';
import { useHistory } from "react-router-dom";
import { createOutline } from 'ionicons/icons';
import './Profile.css';

const Profile: React.FC = () => {
  const history = useHistory();
  const [name, setName] = useState("Fahad");
  const [mobile, setMobile] = useState("7550256613");
  const [password, setPassword] = useState("hello");
  const [confirmpassword, setConfirmPassword] = useState("hello");
  const [email, setEmail] = useState("fahadlee@gmail.com");
  const [isEditMode, setIsEditMode] = useState(false);
  const [avatar, setAvatar] = useState('https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpgx`');
  const [showSaveAlert, setShowSaveAlert] = useState(false);

  const handleNameChange = (event: CustomEvent) => {
    const inputElement = event.target as HTMLInputElement;
    setName(inputElement.value);
  };

  const handleMobileChange = (event: CustomEvent) => {
    const inputElement = event.target as HTMLInputElement;
    setMobile(inputElement.value);
  };

  const handleBack = () => {
    history.push("/menu");
  };

  const handleEmailChange = (event: CustomEvent) => {
    const inputElement = event.target as HTMLInputElement;
    setEmail(inputElement.value);
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

  const handleSaveConfirm = () => {
    // Perform save operation here
    setIsEditMode(false);
    setShowSaveAlert(false);
  };

  const handleSaveCancel = () => {
    setShowSaveAlert(false);
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth');
    if (!isAuthenticated) {
      history.replace('/'); // Redirect to the login page if not authenticated
    }
  }, [history]);

  return (
    <IonPage className="profile-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleBack}>
              <IonBackButton defaultHref="/menu" className="profile-back-button" />
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
            <IonInput value={name} onIonInput={handleNameChange} disabled={!isEditMode}></IonInput>
          </IonItem>
          <IonItem className="profile-input">
            <IonLabel position="floating">Mobile Number</IonLabel>
            <IonInput value={mobile} onIonInput={handleMobileChange} disabled={!isEditMode}></IonInput>
          </IonItem>
          <IonItem className="profile-input">
            <IonLabel position="floating">Password</IonLabel>
            <IonInput value={password} onIonInput={handleMobileChange} disabled={!isEditMode}></IonInput>
          </IonItem>
          <IonItem className="profile-input">
            <IonLabel position="floating">Confirm Password</IonLabel>
            <IonInput value={confirmpassword} onIonInput={handleMobileChange} disabled={!isEditMode}></IonInput>
          </IonItem>
          <IonItem className="profile-input">
            <IonLabel position="floating">Email ID</IonLabel>
            <IonInput value={email} onIonInput={handleEmailChange} disabled={!isEditMode}></IonInput>
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
            </IonButton>
          )}
          <IonAlert
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
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
