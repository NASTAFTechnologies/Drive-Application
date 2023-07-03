import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { logOutOutline } from 'ionicons/icons';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon } from '@ionic/react';
import './Setting.css'
const Settings: React.FC = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("auth"); // Remove the authentication flag from localStorage
    history.push("/"); // Redirect to the login page
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth');
    if (!isAuthenticated) {
      history.replace('/'); // Redirect to the login page if not authenticated
    }
  }, [history]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className='list'>
          <IonList>
            <IonItem>
              <div className='list-item opstion'>
                <IonLabel>Item 1</IonLabel>
              </div>
            </IonItem>
            <IonItem>
              <div className='list-item opstion'>
                <IonLabel>Item 2</IonLabel>
              </div>
            </IonItem>
            <IonItem>
              <div className='list-item' onClick={handleLogout}>
                <IonButton fill="clear" className="logout-btn">
                  Log Out
                  <div className='logout-icon'>
                    <IonIcon style={{ color: "#000" }} icon={logOutOutline} />
                  </div>
                </IonButton>
              </div>
            </IonItem>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Settings;
