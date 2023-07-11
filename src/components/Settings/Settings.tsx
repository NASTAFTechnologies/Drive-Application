import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon, IonToggle } from '@ionic/react';
import './Setting.css';
import { chevronForwardOutline, logOutOutline, moon, personOutline } from 'ionicons/icons';

const Settings: React.FC = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('auth'); // Remove the authentication flag from localStorage
    history.push('/'); // Redirect to the login page
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth');
    if (!isAuthenticated) {
      history.replace('/'); // Redirect to the login page if not authenticated
    }
  }, [history]);

  return (
    <IonPage>
      <IonHeader className='header-title'>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList className="list-container">
          <IonItem className="list-item" onClick={() => history.push('/menu/settings/profile')}>
            <IonButton fill="clear" className="List">
              <IonIcon className='profile-icon' slot="start" icon={personOutline} />
              <IonLabel className="label">Profile</IonLabel>
            </IonButton>
            <IonIcon className="right-icon" slot="end" icon={chevronForwardOutline} />
          </IonItem>
          {/* <IonItem className="list-item">
            <IonButton fill="clear" className="List">
              <IonIcon className='profile-icon' slot="start" icon={moon} />
              <IonLabel className="label">Dark Theme</IonLabel>
            </IonButton>
            <IonToggle id="themeToggle" slot="end" ></IonToggle>
          </IonItem> */}
          <IonItem className="list-item" onClick={handleLogout}>
            <IonButton fill="clear" className="List">
              <IonIcon className="logout-icon" slot="start" icon={logOutOutline} />
              <IonLabel className="label">Log Out</IonLabel>
            </IonButton>
            <IonIcon className="right-icon" slot="end" icon={chevronForwardOutline} />
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
