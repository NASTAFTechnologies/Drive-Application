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
    IonCard,
    IonCardHeader,
    IonCardTitle,
} from '@ionic/react';
import './ViewDuty.css';
import { useHistory } from 'react-router-dom';

const ViewDuty: React.FC = () => {
    const [present] = useIonToast();

    const presentToast = (position: 'top' | 'middle' | 'bottom') => {
        present({
            message: 'Your Booking Was Accepted!',
            duration: 1500,
            position: position,
        });
    };

    const [tripSheetNo, setTripSheetNo] = useState('98897');
    const [StartingDate, setStartingDate] = useState('2023-07-20');
    const [StartingTime, setStartingTime] = useState('11:33');
    const [StartingKilometers, setStartingKilometers] = useState('13567');
    const [ClosingDate, setClosingDate] = useState('2023-07-20');
    const [ClosingTime, setClosingTime] = useState('11:33');
    const [ClosingKilometers, setClosingKilometers] = useState('13867');
    const [vehicleType, setVehicleType] = useState('-');
    const [GuestMobile, setGuestMobile] = useState('7550256616');
    const [companyName, setCompanyName] = useState('Default Company');
    const [guestName, setGuestName] = useState('Default Guest');
    const [Advance, setAdvance] = useState('0');
    const [TollParking, setTollParking] = useState('0');
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
            case 'StartingDate':
                setStartingDate(value);
                break;
            case 'StartingTime':
                setStartingTime(value);
                break;
            case 'StartingKilometers':
                setStartingKilometers(value);
                break;
            case 'ClosingDate':
                setClosingDate(value);
                break;
            case 'ClosingTime':
                setClosingTime(value);
                break;
            case 'ClosingKilometers':
                setClosingKilometers(value);
                break;
            case 'vehicleType':
                setVehicleType(value);
                break;
            case 'GuestMobile':
                setGuestMobile(value);
                break;
            case 'companyName':
                setCompanyName(value);
                break;
            case 'guestName':
                setGuestName(value);
                break;
            case 'TollParking':
                setTollParking(value);
                break;
            case 'Advance':
                setAdvance(value);
                break;
            case 'address':
                setAddress(value);
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
                    <IonTitle>View Duty</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className='form-container-ViewDuty'>
                    <h1>Trip Details</h1>
                    <form onSubmit={handleSubmit}>
                        <IonItem className='field-item'>
                            <IonLabel className='bold-label'>Trip Sheet No :</IonLabel>
                            <IonInput name='tripSheetNo' value={tripSheetNo} readonly />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonLabel className='bold-label'>Starting Date :</IonLabel>
                            <IonInput
                                type='date'
                                name='StartingDate'
                                value={StartingDate}
                                onIonChange={handleInputChange}
                                required
                            />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonLabel className='bold-label'>Starting Time :</IonLabel>
                            <IonInput
                                type='time'
                                name='StartingTime'
                                value={StartingTime}
                                onIonChange={handleInputChange}
                                required
                            />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonLabel className='bold-label'>Starting Kilometers :</IonLabel>
                            <IonInput
                                type='tel'
                                name='StartingKilometers'
                                value={StartingKilometers}
                                onIonChange={handleInputChange}
                                required
                            />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonLabel className='bold-label'>Closing Date :</IonLabel>
                            <IonInput
                                type='date'
                                name='ClosingDate'
                                value={ClosingDate}
                                onIonChange={handleInputChange}
                                required
                            />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonLabel className='bold-label'>Closing Time :</IonLabel>
                            <IonInput
                                type='time'
                                name='ClosingTime'
                                value={ClosingTime}
                                onIonChange={handleInputChange}
                                required
                            />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonLabel className='bold-label'>Closing Kilometers :</IonLabel>
                            <IonInput
                                type='tel'
                                name='ClosingKilometers'
                                value={ClosingKilometers}
                                onIonChange={handleInputChange}
                                required
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
                            <IonLabel className='bold-label'>Guest Mobile :</IonLabel>
                            <IonInput
                                type='tel'
                                name='GuestMobile'
                                value={GuestMobile}
                                onIonChange={handleInputChange}
                                readonly
                            />
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
                            <IonLabel className='bold-label'>Advance :</IonLabel>
                            <IonInput
                                type='number'
                                name='Advance'
                                value={Advance}
                                onIonChange={handleInputChange}
                                required
                            />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonLabel className='bold-label'>Toll & Parking :</IonLabel>
                            <IonInput
                                type='number'
                                name='TollParking'
                                value={TollParking}
                                onIonChange={handleInputChange}
                                required
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
                    </form>
                </div>
                <div className="Uploaded-img">
                    <div className='Sig-btn'>
                        <IonButton
                            className='accept-btn'
                            expand='block'
                            onClick={() => presentToast('top')}
                            // size='small'
                            type='submit'
                        >
                            Signature
                        </IonButton>
                    </div>
                    <IonCard>
                        {/* <img alt="Silhouette of mountains" src="https://img.freepik.com/free-vector/businessman-planning-events-deadlines-agenda_74855-6274.jpg?w=900&t=st=1688480583~exp=1688481183~hmac=88e85cab2e58b10bc489eff32fc71d1633f201a0f8155c6a88b5657262e6a543" /> */}
                        <IonCardHeader>
                            <IonCardTitle>Signature Image</IonCardTitle>
                        </IonCardHeader>
                    </IonCard>
                    <div className='Attachment-btn'>
                        <IonButton
                            className='accept-btn'
                            expand='block'
                            onClick={() => presentToast('top')}
                            // size='small'
                            type='submit'
                        >
                            Attachments
                        </IonButton>
                    </div>
                    <IonCard>
                        {/* <img alt="Silhouette of mountains" src="https://img.freepik.com/free-vector/businessman-planning-events-deadlines-agenda_74855-6274.jpg?w=900&t=st=1688480583~exp=1688481183~hmac=88e85cab2e58b10bc489eff32fc71d1633f201a0f8155c6a88b5657262e6a543" /> */}
                        <IonCardHeader>
                            <IonCardTitle>Attachment Image</IonCardTitle>
                        </IonCardHeader>
                    </IonCard>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default ViewDuty;
