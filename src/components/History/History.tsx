import React, { useEffect, useState } from 'react';
import './History.css';
import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, IonAlert } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const TripSheet: React.FC = () => {
  const history = useHistory();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState<{
    id: number;
    date: string;
    startTime: string;
    duty: string;
    vehicleType: string;
    Action: string;
  }[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupForSubmit, setshowPopupForSubmit] = useState(false);

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
    { id: 3, date: '2023-07-04', startTime: '13:00', duty: 'Evening Shift', vehicleType: 'Truck', Action: 'Open' },
    { id: 4, date: '2023-07-07', startTime: '13:00', duty: 'Night Shift', vehicleType: 'Truck', Action: 'Pending' },
    { id: 5, date: '2023-07-12', startTime: '13:00', duty: 'Night Shift', vehicleType: 'Truck', Action: 'Pending' },
    { id: 6, date: '2023-07-17', startTime: '13:00', duty: 'Night Shift', vehicleType: 'Truck', Action: 'Pending' },
    // Add more data rows here...
  ];

  // Filter the data based on the selected date range
  // Filter the data based on the selected date range
  const filterData = () => {
    if (!startDate || !endDate) {
      setshowPopupForSubmit(true);
      setFilteredData([]);
    } else {
      const filtered = data.filter(item => {
        return item.date >= startDate && item.date <= endDate;
      });
      setFilteredData(filtered);

      if (filtered.length === 0) {
        setshowPopupForSubmit(true);
      } else {
        setshowPopupForSubmit(false);
      }
    }
  };



  // Function to handle downloadExcel button click
  const handleDownloadExcel = () => {
    if (!startDate || !endDate) {
      setShowPopup(true);
    } else {
      if (filteredData.length === 0) {
        setshowPopupForSubmit(true);
      } else {
        downloadExcel();
      }
    }
  };


  // Function to download the data as an Excel file
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Trip Data');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, 'trip_data.xlsx');
  };

  // Dark Mode & Light Mode
  useEffect(() => {
    const colorModeListener = (e: MediaQueryListEvent | MediaQueryList) => {
      const rootElement = document.documentElement;
      rootElement.classList.remove('dark-history', 'light-history');
      rootElement.classList.add(e.matches ? 'dark-history' : 'light-history');
    };

    const colorModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    colorModeListener(colorModeQuery); // Set initial class based on current color mode
    colorModeQuery.addListener(colorModeListener); // Listen for changes in color mode

    return () => {
      colorModeQuery.removeListener(colorModeListener); // Clean up the listener when the component unmounts
    };
  }, []);
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
            <IonInput
              type="date"
              id="fromDate"
              value={startDate}
              onIonChange={(e) => setStartDate(e.detail.value!)}
              required
            />
          </div>
          <div className="filter-input">
            <label className='filter-label' htmlFor="toDate">To:</label>
            <IonInput
              type="date"
              id="toDate"
              value={endDate}
              onIonChange={(e) => setEndDate(e.detail.value!)}
              required
            />
          </div>
          <div className='sumbit-flt-btn'>
            <IonButton size='small' onClick={filterData}>Submit</IonButton>
          </div>
        </div>
        <div className='excel-download-btn'>
          <IonButton color="success" size='small' onClick={handleDownloadExcel} className="custom-button">
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
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>{item.startTime}</td>
                    <td>{item.duty}</td>
                    <td>{item.vehicleType}</td>
                    <td>
                      <div className={`action-button action-${item.Action.toLowerCase()}`}>
                        {item.Action}
                      </div>
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
        header="Download Failured"
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
