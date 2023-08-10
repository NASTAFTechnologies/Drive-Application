import React, { useRef, useEffect } from 'react';
import './DigitalSignature.css';
import { useHistory } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonBackButton, useIonToast, } from '@ionic/react';


const DigitalSignature: React.FC = () => {
  const signatureCanvasRef = useRef<any>();
  const history = useHistory();
  const [present] = useIonToast();
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

  const getSignatureAsImage = () => {
    const image = signatureCanvasRef.current.toDataURL();
    console.log(image);
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth');
    if (!isAuthenticated) {
      history.replace('/'); // Redirect to the login page if not authenticated
    }
  }, [history]);

  const handleBack = () => {
    history.push('/menu/home/closebooking');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleBack}>
              <IonBackButton defaultHref="/menu" className="profile-back-button" />
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
            <IonButton onClick={() => presentToast('top')} type="submit">Save
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DigitalSignature;
