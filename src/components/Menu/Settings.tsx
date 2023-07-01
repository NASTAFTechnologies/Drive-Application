import React,{useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { logOutOutline } from 'ionicons/icons';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon } from '@ionic/react';

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
        <IonList>
          <IonItem>
            <IonLabel>Item 1</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Item 2</IonLabel>
          </IonItem>
          <IonItem>
              <IonButton fill="clear" onClick={handleLogout}>
                Log Out
                <IonIcon style={{ color: "#000" }} icon={logOutOutline} />
              </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default Settings;
