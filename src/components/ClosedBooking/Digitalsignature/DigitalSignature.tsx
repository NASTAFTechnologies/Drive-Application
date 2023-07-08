import React, { useRef, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonBackButton } from '@ionic/react';
import './DigitalSignature.css';
import { useHistory } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';

const DigitalSignature: React.FC = () => {
  const signatureCanvasRef = useRef<any>();

  const clearCanvas = () => {
    signatureCanvasRef.current.clear();
  };

  const getSignatureAsImage = () => {
    const image = signatureCanvasRef.current.toDataURL();
    // Use the image as needed
    console.log(image);
  };
  const history = useHistory();

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
            canvasProps={{ className: 'signature-canvas' }}
            penColor="blue"
            backgroundColor="lightgray"
          />
          <div className="button-container">
            <IonButton onClick={clearCanvas}>Clear</IonButton>
            <IonButton onClick={getSignatureAsImage}>Save</IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DigitalSignature;
