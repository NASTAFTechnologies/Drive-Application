import React, { useEffect, useState } from 'react';
import { IonCard, IonIcon, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonModal, IonBackButton } from '@ionic/react';
import { useHistory } from "react-router-dom";
import { chevronBackOutline, closeCircleOutline, earthOutline, eyeOutline } from 'ionicons/icons';
import './ClosedBooking.css';

const ClosedBooking: React.FC = () => {
  const [isIPhone, setIsIPhone] = useState(false);

  useEffect(() => {
    const isiPhone = /iPhone/.test(navigator.userAgent);
    setIsIPhone(isiPhone);
  }, []);
  const history = useHistory();
  const [showPopup, setShowPopup] = useState(false);

  const handleCardClickBooking = () => {
    setShowPopup(true);
  };

  const handleOptionClick = (option: string) => {
    setShowPopup(false);

    if (option === 'Start Duty') {
      history.push('/menu/home/closebooking/startduty');
    } else if (option === 'Close Duty') {
      history.push('/menu/home/closebooking/closeduty');
    } else if (option === 'View Duty') {
      history.push('/menu/home/closebooking/viewduty');
    }
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth');
    if (!isAuthenticated) {
      history.replace('/');
    }
  }, [history]);

  const handleBack = () => {
    history.push("/menu");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton className='profile-back-button' onClick={handleBack}>
              <IonIcon icon={chevronBackOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Closed Booking</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard onClick={handleCardClickBooking}>
          <IonCardHeader>
            <IonCardTitle>Local</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>20/05/2022@08.00</IonCardContent>
        </IonCard>

        <IonCard onClick={handleCardClickBooking}>
          <IonCardHeader>
            <IonCardTitle>Transfer</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>20/07/2022@18.30</IonCardContent>
        </IonCard>

        <IonModal isOpen={showPopup} onDidDismiss={() => setShowPopup(false)} className="my-modal">
          <div className="popup-title"><span>Bhuvaneswari muthusamy</span></div>
          <div className={isIPhone ? 'popup-container iphone' : 'popup-container android'} id="popupContainer">
            <div className="popup-row">
              <IonButton className="popup-btn" onClick={() => handleOptionClick('Start Duty')}>
                <IonIcon className="popupicon" icon={earthOutline} />
                <div className="popuplabel">Start Duty</div>
              </IonButton>
            </div>
            <div className="popup-row">
              <IonButton className="popup-btn" onClick={() => handleOptionClick('Close Duty')}>
                <IonIcon className="popupicon" icon={closeCircleOutline} />
                <div className="popuplabel">Close Duty</div>
              </IonButton>
            </div>
            <div className="popup-row">
              <IonButton className="popup-btn" onClick={() => handleOptionClick('View Duty')}>
                <IonIcon className="popupicon" icon={eyeOutline} />
                <div className="popuplabel">View Duty</div>
              </IonButton>
            </div>
          </div>
        </IonModal>

      </IonContent>
    </IonPage>
  );
};

export default ClosedBooking;
