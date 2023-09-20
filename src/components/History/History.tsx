import React, { useEffect, useState } from 'react';
import './History.css';
import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, IonAlert } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
const TripSheet: React.FC = () => {
  const history = useHistory();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupForSubmit, setshowPopupForSubmit] = useState(false);
  const filterData = () => {
    if (!startDate || !endDate) {
      setShowPopup(true); // Show an alert if both dates are not entered
      return;
    }
    const loggedInUsername = localStorage.getItem('loggedInUsername');
    if (loggedInUsername) {
      axios
        .get(`http://localhost:8081/tripsheetfilter/${loggedInUsername}`, {
          // .get(`http://localhost:8081/tripsheetfilter/akash?startDate=2023-01-01&endDate=2023-09-20`, {
          params: {
            startDate: startDate,
            endDate: endDate,
          },
        })
        .then((response) => {
          setFilteredData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching trip sheet details:', error);
        });
    } else {
      console.error('Duty type and tripid not found in localStorage');
    }
  };
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth');
    if (!isAuthenticated) {
      history.replace('/'); // Redirect to the login page if not authenticated
    }
  }, [history]);
  
  interface TripData {
    tripid: number;
    startdate: string;
    starttime: string;
    duty: string;
    vehType: string;
    apps: string;
  }
  return (
    <IonPage>
      <IonHeader className='header-title'>
        <IonToolbar>
          <IonTitle>History</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className={`date-filter`}>
          <div className="filter-input">
            <label className='filter-label' htmlFor="fromDate">From:</label>
            <IonInput className='input' type="date" id="fromDate" value={startDate} onIonChange={(e) => setStartDate(e.detail.value!)} required />
          </div>
          <div className="filter-input">
            <label className='filter-label' htmlFor="toDate">To:</label>
            <IonInput className='input' type="date" id="toDate" value={endDate} onIonChange={(e) => setEndDate(e.detail.value!)} required />
          </div>
          <div className='sumbit-flt-btn'>
            <IonButton size='small' onClick={filterData}>Submit</IonButton>
          </div>
        </div>
        <div className='excel-download-btn'>
          <IonButton color="success" size='small'  className="custom-button">
            Download Excel
          </IonButton>
        </div>
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
              {filteredData && filteredData.length > 0 ? (
                filteredData.map((item: TripData) => (
                  <tr key={item.tripid}>
                    <td>{item.startdate}</td>
                    <td>{item.starttime}</td>
                    <td>{item.duty}</td>
                    <td>{item.vehType}</td>
                    <td>
                      {item.apps && (
                        <div className={`action-button action-${item.apps.toLowerCase()}`}>
                          {item.apps}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </IonContent>
      <IonAlert
        isOpen={showPopup}
        onDidDismiss={() => setShowPopup(false)}
        header="Download Failure"
        message="Please enter both from and to dates."
        buttons={['OK']}
      />
      <IonAlert
        isOpen={showPopupForSubmit}
        onDidDismiss={() => setshowPopupForSubmit(false)}
        header="Missing Dates"
        message="You entered a date that was not in your memory. !!"
        buttons={['OK']}
      />
    </IonPage>
  );
};
export default TripSheet;
