import React, { useRef, useEffect, useState } from 'react';
import './DigitalSignature.css';
import { useHistory } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonBackButton, useIonToast, IonIcon, } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
import axios from 'axios';

const DigitalSignature: React.FC = () => {
  const signatureCanvasRef = useRef<any>();
  const history = useHistory();
  const [present] = useIonToast();
  const [userData, setUserData] = useState({
    tripid: '',
  });
  const presentToast = (position: 'top' | 'middle' | 'bottom') => {
    present({
      message: 'Signature Saved !',
      duration: 1500,
      position: position,
    });
  };

  const clearCanvas = () => {
    signatureCanvasRef.current.clear();
  };
  useEffect(() => {
    // Retrieve duty type and tripid from localStorage
    const selectDuty = localStorage.getItem('selectDuty');
    const selectTripid = localStorage.getItem('selectTripid');

    // Check if duty type and tripid are available
    if (selectDuty && selectTripid) {
      // Fetch trip sheet details based on selectedDuty and selectedTripid
      axios
        .get(`http://localhost:8081/tripsheet/${selectTripid}/${selectDuty}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
        });
    } else {
      // Handle the case where duty type and tripid are not available in localStorage
    }
  }, []);

  const handleCloseDuty = () => {
    const updatedData = {
      tripid: userData.tripid,
      apps: 'Closed',
    };

    axios
      .post('http://localhost:8081/update_closetrip_apps', updatedData)
      .then((response) => {
        presentToast('top'); // Show a success message
        history.push('/menu/home');
      })
      .catch((error) => {
        presentToast('top'); // Show an error message
      });
  };

  const saveSignature = async () => {
    const dataUrl = signatureCanvasRef.current.toDataURL('image/png');
    const selectTripid = localStorage.getItem('selectTripid');

    try {
      const response = await fetch('http://localhost:8081/api/saveSignature', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tripid: selectTripid, signatureData: dataUrl }), // Include tripid
      });

      if (response.ok) {
      } else {
      }
    } catch (error) {
    }
  };


  const handleclosesave = () => {
    saveSignature();
    handleCloseDuty();

  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth');
    if (!isAuthenticated) {
      history.replace('/');
    }
  }, [history]);

  const handleBack = () => {
    history.push('/menu/home/closebooking/closeduty');
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
          <IonTitle>Digital Signature</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="signature-container">
          <SignatureCanvas
            ref={signatureCanvasRef}
            canvasProps={{
              className: 'signature-canvas', width: 350, height: 400,
              style: { borderRadius: '10px' }
            }}
            penColor="black"
            backgroundColor="lightgray"
          />

          <div className="button-container">
            <IonButton onClick={clearCanvas}>Clear</IonButton>
            <IonButton onClick={handleclosesave} type="submit">Save
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DigitalSignature;
