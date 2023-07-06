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
import './StartDuty.css';
import { useHistory } from 'react-router-dom';

const StartDuty: React.FC = () => {
    const [present] = useIonToast();

    const presentToast = (position: 'top' | 'middle' | 'bottom') => {
        present({
            message: 'Your Booking Was Accepted!',
            duration: 1500,
            position: position,
        });
    };

    const [tripSheetNo, setTripSheetNo] = useState('98897');
    const [tripDate, setTripDate] = useState('2023-07-20');
    const [reportTime, setReportTime] = useState('11:33');
    const [dutyType, setDutyType] = useState('Local');
    const [vehicleType, setVehicleType] = useState('-');
    const [contactNumber, setContactNumber] = useState('7550256616');
    const [companyName, setCompanyName] = useState('Default Company');
    const [guestName, setGuestName] = useState('Default Guest');
    const [address, setAddress] = useState('ITC Choll Park');
    const [startDate, setStartDate] = useState(tripDate);
    const [startTime, setStartTime] = useState('');
    const [startKilometers, setStartKilometers] = useState('');

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
                setCompanyName(value);
                break;
            case 'guestName':
                setGuestName(value);
                break;
            case 'address':
                setAddress(value);
                break;
            case 'startDate':
                setStartDate(value);
                break;
            case 'startTime':
                setStartTime(value);
                break;
            case 'startKilometers':
                setStartKilometers(value);
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
                    <IonTitle>Start Duty</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className='form-container-StartDuty'>
                    <form onSubmit={handleSubmit}>
                        <IonItem className='field-item'>
                            <IonLabel className='bold-label'>Trip Sheet No :</IonLabel>
                            <IonInput name='tripSheetNo' value={tripSheetNo} readonly />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonLabel className='bold-label'>Trip Date :</IonLabel>
                            <IonInput
                                type='date'
                                name='tripDate'
                                value={tripDate}
                                onIonChange={handleInputChange}
                                required
                            />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonLabel className='bold-label'>Report Time :</IonLabel>
                            <IonInput
                                type='time'
                                name='reportTime'
                                value={reportTime}
                                onIonChange={handleInputChange}
                                required
                            />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonLabel className='bold-label'>Duty Type :</IonLabel>
                            <IonInput name='dutyType' value={dutyType} readonly />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonLabel className='bold-label'>Vehicle Type :</IonLabel>
                            <IonInput name='vehicleType' value={vehicleType} readonly />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonLabel className='bold-label'>Company Name :</IonLabel>
                            <IonInput
                                name='companyName'
                                value={companyName}
                                onIonChange={handleInputChange}
                                readonly
                            />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonLabel className='bold-label'>Guest Name :</IonLabel>
                            <IonInput
                                name='guestName'
                                value={guestName}
                                onIonChange={handleInputChange}
                                readonly
                            />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonLabel className='bold-label'>Contact Number :</IonLabel>
                            <IonInput
                                type='tel'
                                name='contactNumber'
                                value={contactNumber}
                                onIonChange={handleInputChange}
                                readonly
                            />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonLabel className='bold-label'>Address :</IonLabel>
                            <IonTextarea
                                name='address'
                                value={address}
                                onIonChange={handleInputChange}
                                readonly
                            />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonLabel className='bold-label'>Start Date :</IonLabel>
                            <IonInput
                                type='date'
                                name='startDate'
                                value={startDate}
                                onIonChange={handleInputChange}
                                required
                            />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonLabel className='bold-label'>Start Time :</IonLabel>
                            <IonInput
                                type='time'
                                name='startTime'
                                value={startTime}
                                onIonChange={handleInputChange}
                                required
                            />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonLabel className='bold-label'>Start Kilometers :</IonLabel>
                            <IonInput
                                type='tel'
                                name='startKilometers'
                                value={startKilometers}
                                onIonChange={handleInputChange}
                                required
                            />
                        </IonItem>
                        <IonButton
                            className='booking-accept-btn'
                            expand='block'
                            onClick={() => presentToast('top')}
                            size='small'
                            type='submit'
                        >
                            Start Duty
                        </IonButton>
                        <IonButton
                            className='accept-btn'
                            expand='block'
                            onClick={() => presentToast('top')}
                            size='small'
                            type='submit'
                        >
                            Upload-Toll / Parking
                        </IonButton>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default StartDuty;
