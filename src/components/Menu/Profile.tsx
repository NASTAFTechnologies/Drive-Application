import React, { useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonBackButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Profile: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth');
    if (!isAuthenticated) {
      history.replace('/'); // Redirect to the login page if not authenticated
    }
  }, [history]);

  const handleBack = () => {
    history.goBack(); // Go back to the previous page
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleBack}>
              <IonBackButton defaultHref="/menu" />
            </IonButton>
          </IonButtons>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Content for Profile page */}
      </IonContent>
    </IonPage>
  );
};

export default Profile;
