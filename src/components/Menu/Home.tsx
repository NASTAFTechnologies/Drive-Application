import React from 'react';
import './Home.css'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/react';
import { useHistory } from "react-router-dom";
import { logOutOutline } from 'ionicons/icons';

const Home: React.FC = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("auth"); // Remove the authentication flag from localStorage
    history.push("/login"); // Redirect to the login page
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className='header'>
            <IonButton fill="clear" onClick={handleLogout}>
              <IonIcon style={{ color: "#000" }} icon={logOutOutline} />
            </IonButton>
            <IonTitle >Home</IonTitle>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid tempora, impedit reiciendis velit ratione suscipit deserunt odit esse delectus magni! In suscipit nostrum dolore a esse excepturi rem neque voluptate!</p>
      </IonContent>
    </IonPage>
  );
};

export default Home;
