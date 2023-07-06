import React, { useEffect } from 'react';

import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import { useHistory } from "react-router-dom";

const TripSheet: React.FC = () => {
  const history = useHistory();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth');
    if (!isAuthenticated) {
      history.replace('/'); // Redirect to the login page if not authenticated
    }
  }, [history]);

  return (
    <IonPage >
      <IonHeader>
        <IonToolbar>
          <IonTitle>TripSheet</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Content for Menu1 */}
      </IonContent>
    </IonPage>
  );
};

export default TripSheet;
