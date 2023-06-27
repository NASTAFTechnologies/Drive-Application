import React from "react";
import { IonContent, IonButton, IonPage } from '@ionic/react';
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("auth"); // Remove the authentication flag from localStorage
    history.push("/login"); // Redirect to the login page
  };

  return (<IonPage>
    <IonContent>
      <div className="login-main">
        <h1>Home page</h1>
        <IonButton onClick={handleLogout}>Logout</IonButton>
      </div>
    </IonContent>
  </IonPage>
  );
};

export default Home;
