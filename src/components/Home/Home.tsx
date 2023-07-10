import React, { useEffect } from 'react';
import './Home.css';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/react';
import { useHistory } from "react-router-dom";
import { logOutOutline } from 'ionicons/icons';

const Home: React.FC = () => {
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


  const handleCardClickNewBooking = () => {
    history.push('/menu/home/newbooking'); // Replace '/another-page' with the desired path of the destination page
  };
  const handleCardClosedNewBooking = () => {
    history.push('/menu/home/closebooking'); // Replace '/another-page' with the desired path of the destination page
  };
  return (
    <IonPage>
      <IonHeader className='header-title'>
        <IonToolbar>
          <div className='header'>
            <IonButton fill="clear" onClick={handleLogout}>
              <IonIcon style={{ color: "#000" }} icon={logOutOutline} />
            </IonButton>
            <IonTitle>Home</IonTitle>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard onClick={handleCardClickNewBooking}>
          <img alt="Silhouette of mountains" src="https://img.freepik.com/free-vector/businessman-planning-events-deadlines-agenda_74855-6274.jpg?w=900&t=st=1688480583~exp=1688481183~hmac=88e85cab2e58b10bc489eff32fc71d1633f201a0f8155c6a88b5657262e6a543" />
          <IonCardHeader>
            <IonCardTitle>New Booking</IonCardTitle>
            <IonCardSubtitle>Customer Details</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent></IonCardContent>
        </IonCard>
        <IonCard onClick={handleCardClosedNewBooking}>
          <img alt="Silhouette of mountains" src="https://img.freepik.com/free-vector/man-renting-car-car-sharing-app-city-map-with-pointers-consultant-flat-vector-illustration-transportation-urban-transport_74855-8450.jpg?w=900&t=st=1688480949~exp=1688481549~hmac=82b21842da702837e34761dc1b41077022cd62c124bdf928c2ba098d9bfe2ba2" />
          <IonCardHeader>
            <IonCardTitle>Closed Booking</IonCardTitle>
            <IonCardSubtitle>Customer Request</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent></IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
