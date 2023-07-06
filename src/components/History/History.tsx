import React, { useEffect } from 'react';
import './History.css';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from "react-router-dom";

const TripSheet: React.FC = () => {
  const history = useHistory();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth');
    if (!isAuthenticated) {
      history.replace('/'); // Redirect to the login page if not authenticated
    }
  }, [history]);

  // TABLE DATA
  const data = [
    { id: 1, date: '2023-07-01', startTime: '09:00', duty: 'Morning Shift', vehicleType: 'Car', Action: 'Accept' },
    { id: 2, date: '2023-07-02', startTime: '13:00', duty: 'Afternoon Shift', vehicleType: 'Truck', Action: 'Accept' },
    { id: 2, date: '2023-07-04', startTime: '13:00', duty: 'Evening Shift', vehicleType: 'Truck', Action: 'Open' },
    { id: 2, date: '2023-07-07', startTime: '13:00', duty: 'Night Shift', vehicleType: 'Truck', Action: 'Pending' },
    // Add more data rows here...
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>History</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="table-container">
          <table className="ionic-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Start Time</th>
                <th>Duty</th>
                <th>Vehicle Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td>{item.startTime}</td>
                  <td>{item.duty}</td>
                  <td>{item.vehicleType}</td>
                  <td>{item.Action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TripSheet;
