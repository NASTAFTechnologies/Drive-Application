import React, { FormEvent, useEffect, useState } from 'react';
import {
    IonInput,
    IonItem,
    IonTextarea,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonCheckbox,
    IonButton,
    useIonToast,
    IonIcon,
} from '@ionic/react';
import './StartDuty.css';
import { useHistory } from 'react-router-dom';
import { chevronBackOutline } from 'ionicons/icons';
import axios from 'axios';

const StartDuty: React.FC = () => {
    const [present] = useIonToast();
    const history = useHistory();
    const [userData, setUserData] = useState({
        tripid: '',
        startdate: '',
        reporttime: '',
        duty: '',
        vehType: '',
        customer: '',
        guestname: '',
        guestmobileno: '',
        address1: '',
        startkm: '',
        starttime: '',

    });

    useEffect(() => {
        // Retrieve duty type and tripid from localStorage
        const selectDuty = localStorage.getItem('selectDuty');
        const selectTripid = localStorage.getItem('selectTripid');

        // Check if duty type and tripid are available
        if (selectDuty && selectTripid) {
            // Fetch trip sheet details based on selectedDuty and selectedTripid
            axios
                .get(`http://localhost:8081/tripsheet/${selectTripid}/${selectDuty}`)
                .then((response) => {
                    setUserData(response.data);
                })
                .catch((error) => {
                });
        } else {

        }
    }, []);

    const handleStartDuty = () => {
        // Create a payload with the updated data (e.g., changing the 'status' to 'accept')
        const updatedData = {
            tripid: userData.tripid,
            apps: 'On_Going', // Update with the new status value
        };

        axios
            .post('http://localhost:8081/update_starttrip_apps', updatedData)
            .then((response) => {
                presentToast('top'); // Show a success message
                history.push('/menu/home');
            })
            .catch((error) => {
                presentToast('top'); // Show an error message
            });
    };

    const handleUpdateduty = () => {
        const tripid = localStorage.getItem('selectTripid');
        const updatedData = {
            tripid: tripid,
            startdate: userData.startdate,
            starttime: userData.starttime,
            startkm: userData.startkm,
        };
        axios
            .post('http://localhost:8081/update_updatekm', updatedData)
            .then((response) => {
                presentToast('top');
                history.push('/menu/home');
            })
            .catch((error) => {
                presentToast('top');
            });
    };

    const handlestart = () => {
        handleUpdateduty();
        handleStartDuty();
    };

    const presentToast = (position: 'top' | 'middle' | 'bottom') => {
        present({
            message: 'Your Duty Was Started !',
            duration: 1500,
            position: position,
        });
    };


    const handleInputChange = (e: CustomEvent) => {
        const { name, value } = e.target as HTMLInputElement;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
    const handleBtnClickToll = () => {
        history.push('/menu/home/startduty/updatetoll'); // Replace '/another-page' with the desired path of the destination page
    };
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton className='profile-back-button' onClick={handleBack}>
                            <IonIcon icon={chevronBackOutline} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Start Duty</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className='form-container-StartDuty'>
                    <form onSubmit={handleSubmit}>
                        <IonItem className='field-item'>
                            <IonInput label='Trip Sheet No :' name="tripid" onIonChange={handleInputChange} value={userData.tripid} readonly />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Report Time :' name="reporttime" value={userData.reporttime} onIonChange={handleInputChange} required />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Duty Type :' name="duty" value={userData.duty} readonly />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Vehicle Type :' name="vehType" value={userData.vehType} readonly />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Company Name ' name="customer" value={userData.customer} readonly />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Guest Name :' name="guestname" value={userData.guestname} readonly />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Contact Number :' name="guestmobileno" value={userData.guestmobileno} onIonChange={handleInputChange} readonly />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonTextarea label='Address :' name="address1" value={userData.address1} onIonChange={handleInputChange} readonly />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Trip Date :' type='date' name="startdate" value={userData.startdate} onIonChange={handleInputChange} />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Start Time :' type='time' name="starttime" value={userData.starttime} onIonChange={handleInputChange} />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Start Kilometers :' name='startkm' value={userData.startkm} onIonChange={handleInputChange} />
                        </IonItem>
                        <IonItem>
                            <IonCheckbox aria-required />
                            Above Mentioned value are correct
                        </IonItem>
                        <IonButton className='booking-accept-btn' expand='block' onClick={handlestart} size='small' type='submit'>
                            Start Duty
                        </IonButton>
                        <IonButton onClick={handleBtnClickToll} className='accept-btn' size='small'>Upload-Toll / Parking</IonButton>

                    </form>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default StartDuty;
