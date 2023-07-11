import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon } from '@ionic/react';
import './Setting.css';
import { chevronForwardOutline, logOutOutline, personOutline } from 'ionicons/icons';

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

  // Dark Mode & Light Mode
  useEffect(() => {
    const colorModeListener = (e: MediaQueryListEvent | MediaQueryList) => {
      const rootElement = document.documentElement;
      rootElement.classList.remove('dark-settings', 'light-settings');
      rootElement.classList.add(e.matches ? 'dark-settings' : 'light-settings');
    };

    const colorModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    colorModeListener(colorModeQuery); // Set initial class based on current color mode
    colorModeQuery.addListener(colorModeListener); // Listen for changes in color mode

    return () => {
      colorModeQuery.removeListener(colorModeListener); // Clean up the listener when the component unmounts
    };
  }, []);
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
            <div onClick={() => history.push('/menu/settings/profile')}>
              <IonItem className="list-item">
                <IonButton fill="clear" className="List">
                  <IonIcon className='profile-icon' slot="start" icon={personOutline} />
                  <IonLabel className="label">Profile</IonLabel>
                </IonButton>
                <IonIcon className="right-icon" slot="end" icon={chevronForwardOutline} />
              </IonItem>
            </div>

            <div onClick={handleLogout}>
              <IonItem className="list-item">
                <IonButton fill="clear" className="List">
                  <IonIcon className="logout-icon" slot="start" icon={logOutOutline} />
                  <IonLabel className="label">Log Out</IonLabel>
                </IonButton>
                <IonIcon className="right-icon" slot="end" icon={chevronForwardOutline} />
              </IonItem>
            </div>


          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
