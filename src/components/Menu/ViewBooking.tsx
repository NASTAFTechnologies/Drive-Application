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
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

const ViewBooking: React.FC = () => {

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
                    <IonTitle>View Booking :</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <form onSubmit={handleSubmit}>
                    <IonItem>
                        <IonLabel>Trip Sheet No :</IonLabel>
                        <IonInput
                            name="tripSheetNo"
                            value={tripSheetNo}
                            onIonChange={handleInputChange}
                            readonly
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel>Trip Date :</IonLabel>
                        <IonInput
                            type="date"
                            name="tripDate"
                            value={tripDate}
                            onIonChange={handleInputChange}
                            required
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel>Report Time :</IonLabel>
                        <IonInput
                            type="time"
                            name="reportTime"
                            value={reportTime}
                            onIonChange={handleInputChange}
                            required
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel>Duty Type :</IonLabel>
                        <IonInput name="dutyType" value={dutyType} readonly />
                    </IonItem>
                    <IonItem>
                        <IonLabel>Vehicle Type :</IonLabel>
                        <IonInput name="vehicleType" value={vehicleType} readonly />
                    </IonItem>
                    <IonItem>
                        <IonLabel>Company Name :</IonLabel>
                        <IonInput name="companyName" value={companyName} readonly />
                    </IonItem>
                    <IonItem>
                        <IonLabel>Guest Name :</IonLabel>
                        <IonInput name="guestName" value={guestName} readonly />
                    </IonItem>
                    <IonItem>
                        <IonLabel>Contact Number :</IonLabel>
                        <IonInput
                            type="tel"
                            name="contactNumber"
                            value={contactNumber}
                            onIonChange={handleInputChange}
                            readonly
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel>Address :</IonLabel>
                        <IonTextarea
                            name="address"
                            value={address}
                            onIonChange={handleInputChange}
                            readonly
                        />
                    </IonItem>
                    <IonButton className="booking-accept-btn" expand="block" size="small" type="submit">Accept
                    </IonButton>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default ViewBooking;
