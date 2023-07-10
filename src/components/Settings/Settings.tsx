import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon } from '@ionic/react';
import './Setting.css';
import { logOutOutline, personOutline } from 'ionicons/icons';

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
        <div className="list-container">
          <IonList>
            <div className="list-item" onClick={() => history.push('/menu/settings/profile')}>
              <IonItem>
                <IonButton fill="clear" className="List">
                  <IonIcon className='profile-icon' slot="start" icon={personOutline} />
                  <IonLabel className="label">Profile</IonLabel>
                </IonButton>
              </IonItem>
            </div>

            <div className="list-item" onClick={handleLogout}>
              <IonItem>
                <IonButton fill="clear" className="List">
                  <IonIcon className='logout-icon' slot="start" icon={logOutOutline} />
                  <IonLabel className="label">Log Out</IonLabel>
                </IonButton>
              </IonItem>
            </div>

          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
