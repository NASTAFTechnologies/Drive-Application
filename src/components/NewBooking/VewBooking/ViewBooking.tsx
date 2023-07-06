import React, { FormEvent, useEffect, useState } from 'react';
import {
    IonInput,
    IonItem,
    IonLabel,
    IonTextarea,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonBackButton,
    useIonToast,
} from '@ionic/react';
import './ViewBooking.css'
import { useHistory } from 'react-router-dom';

const ViewBooking: React.FC = () => {

    const [present] = useIonToast();
    const presentToast = (position: 'top' | 'middle' | 'bottom') => {
        present({
            message: 'Your Booking Was Accepted !',
            duration: 1500,
            position: position,
        });
    };

    const [tripSheetNo, setTripSheetNo] = useState('98897');
    const [tripDate, setTripDate] = useState('2023-07-20');
    const [reportTime, setReportTime] = useState('11:33');
    const [dutyType, setDutyType] = useState('Local');
    const [vehicleType, setVehicleType] = useState('-');
    const [companyName, setCompanyName] = useState('Default Company');
    const [guestName, setGuestName] = useState('Default Guest');
    const [contactNumber, setContactNumber] = useState('7550256616');
    const [address, setAddress] = useState('ITC Choll Park');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add logic to handle form submission
    };
    const handleInputChange = (e: CustomEvent) => {
        const { name, value } = e.detail;
        switch (name) {
          case 'tripSheetNo':
            setTripSheetNo(value);
            break;
          case 'tripDate':
            setTripDate(value);
            break;
          case 'reportTime':
            setReportTime(value);
            break;
          case 'dutyType':
            setDutyType(value);
            break;
          case 'vehicleType':
            setVehicleType(value);
            break;
          case 'contactNumber':
            setContactNumber(value);
            break;
          case 'companyName':
            setCompanyName(value); // Use the setter function to update the variable
            break;
          case 'guestName':
            setGuestName(value); // Use the setter function to update the variable
            break;
          case 'address':
            setAddress(value); // Use the setter function to update the variable
            break;
          default:
            break;
        }
      };

    const history = useHistory();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('auth');
        if (!isAuthenticated) {
            history.replace('/'); // Redirect to the login page if not authenticated
        }
    }, [history]);

    const handleBack = () => {
        history.push('/menu/home/newbooking');
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
                    <IonTitle>View Booking</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className='form-container'>
                    <form onSubmit={handleSubmit}>
                        <IonItem className='field-item'>
                            <IonLabel className="bold-label">Trip Sheet No :</IonLabel>
                            <IonInput
                                name="tripSheetNo"
                                value={tripSheetNo}
                                onIonChange={handleInputChange}
                                readonly
                            />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonLabel className="bold-label">Trip Date :</IonLabel>
                            <IonInput
                                type="date"
                                name="tripDate"
                                value={tripDate}
                                onIonChange={handleInputChange}
                                required
                            />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonLabel className="bold-label">Report Time :</IonLabel>
                            <IonInput
                                type="time"
                                name="reportTime"
                                value={reportTime}
                                onIonChange={handleInputChange}
                                required
                            />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonLabel className="bold-label">Duty Type :</IonLabel>
                            <IonInput name="dutyType" value={dutyType} readonly />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonLabel className="bold-label">Vehicle Type :</IonLabel>
                            <IonInput name="vehicleType" value={vehicleType} readonly />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonLabel className="bold-label">Company Name :</IonLabel>
                            <IonInput name="companyName" value={companyName} readonly />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonLabel className="bold-label">Guest Name :</IonLabel>
                            <IonInput name="guestName" value={guestName} readonly />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonLabel className="bold-label">Contact Number :</IonLabel>
                            <IonInput
                                type="tel"
                                name="contactNumber"
                                value={contactNumber}
                                onIonChange={handleInputChange}
                                readonly
                            />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonLabel className="bold-label">Address :</IonLabel>
                            <IonTextarea
                                name="address"
                                value={address}
                                onIonChange={handleInputChange}
                                readonly
                            />
                        </IonItem>
                        <IonButton className="booking-accept-btn" expand="block" onClick={() => presentToast('top')} size="small" type="submit">Accept
                        </IonButton>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default ViewBooking;
