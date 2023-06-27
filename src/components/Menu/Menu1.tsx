import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
import { useHistory } from "react-router-dom";

const Menu1: React.FC = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("auth"); // Remove the authentication flag from localStorage
    history.push("/login"); // Redirect to the login page
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ color: "#000" }}>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton onClick={handleLogout}>Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Menu1;
