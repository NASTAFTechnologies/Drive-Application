import React, { useEffect, useState } from 'react';
import { IonCard, IonIcon, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonModal, IonBackButton } from '@ionic/react';
import { useHistory } from "react-router-dom";
import { chevronBackOutline, closeCircleOutline, earthOutline, eyeOutline } from 'ionicons/icons';
import './ClosedBooking.css';
import axios from 'axios';
const ClosedBooking: React.FC = () => {
  const [isIPhone, setIsIPhone] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  interface Booking {
    tripid: number;
    duty: string;
    startdate: string;
    guestname: string;
    apps: string;
  }
  useEffect(() => {
    const isiPhone = /iPhone/.test(navigator.userAgent);
    setIsIPhone(isiPhone);
  }, []);
  const history = useHistory();
  const [showPopup, setShowPopup] = useState(false);

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
  //accepted tripsheet duty display
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth');
    if (!isAuthenticated) {
      history.replace('/'); // Redirect to the login page if not authenticated
    } else {
      const loggedInUsername = localStorage.getItem('loggedInUsername');
      axios.get(`http://localhost:8081/closedtripsheet/${loggedInUsername}`)
        .then((response) => {
          console.log('Response data:', response.data); // Log the response data
          setBookings(response.data);
        })
        .catch((error) => {
          console.error("Error fetching newbookings:", error);
        });
    }
  }, [history]);
  const handleCardClickBooking = (tripid: number, duty: string) => {
    localStorage.setItem('selectDuty', duty);
    localStorage.setItem('selectTripid', tripid.toString());
    setShowPopup(true);
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

  //for status color change
  function getStatusColorClass(status: string) {
    switch (status) {
      case 'Accept':
        return 'green-status';
      case 'On Going':
        return 'green-status';
      case 'waiting':
        return 'orange-status';
      case 'Closed':
        return 'red-status';
      default:
        return '';
    }
  }
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
        {bookings.map((booking) => (
          <IonCard key={booking.tripid} onClick={() => handleCardClickBooking(booking.tripid, booking.duty)}>
            <IonCardHeader>
              <IonCardTitle>{booking.duty}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{booking.startdate}</IonCardContent>
            <span id="car-status" className={getStatusColorClass(booking.apps)}>{booking.apps}</span>
          </IonCard>
        ))}
        <IonModal isOpen={showPopup} onDidDismiss={() => setShowPopup(false)} className="my-modal">
          {bookings.map((booking) => (
            <div key={booking.tripid}>
              {booking.tripid === Number(localStorage.getItem('selectTripid')) && (
                <>
                  <div className="popup-title"><span>{booking.guestname}</span></div>
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
                </>
              )}
            </div>
          ))}
        </IonModal>

      </IonContent>
    </IonPage>
  );
};

export default ClosedBooking;
