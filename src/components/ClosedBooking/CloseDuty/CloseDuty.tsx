import React, { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
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
    useIonToast,
    IonButton,
    IonIcon,
} from '@ionic/react';
import './CloseDuty.css';
import { useHistory } from 'react-router-dom';
import { chevronBackOutline } from 'ionicons/icons';

const CloseDuty: React.FC = () => {
    const [present] = useIonToast();
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
        toll: '',
        parking: '',
        closedate: '',
        closetime: '',
        closekm: '',
    });

    const presentToast = (position: 'top' | 'middle' | 'bottom') => {
        present({
            message: 'Your Duty Was Started !',
            duration: 1500,
            position: position,
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

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
                    console.error('Error fetching trip sheet details:', error);
                });
        } else {
            // Handle the case where duty type and tripid are not available in localStorage
            console.error('Duty type and tripid not found in localStorage');
        }
    }, []);

    const handleUpdateduty = () => {
        const tripid = localStorage.getItem('selectTripid');
        const updatedData = {
            tripid: tripid,
            closekm: userData.closekm,
            closedate: userData.closedate,
            closetime: userData.closetime,
        };
        console.log(updatedData);
        axios
            .post('http://localhost:8081/update_updateclosekm', updatedData)
            .then((response) => {
                console.log('Update successful:', response.data);
                presentToast('top');
            })
            .catch((error) => {
                console.error('Error updating status:', error);
                presentToast('top');
            });
    };

    const handleBtnCloseduty = () => {
        history.push('/menu/home/startduty/digitalsign'); // Replace '/another-page' with the desired path of the destination page
    };

    const handleBtnClickCloseduty = () => {
        handleBtnCloseduty();
        handleUpdateduty();
    };

    const handleInputChange = (e: CustomEvent) => {
        const { name, value } = e.target as HTMLInputElement;
        console.log(`Input Name: ${name}, Input Value: ${value}`);
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
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
    const handleBtnClickToll = () => {
        history.push('/menu/home/startduty/updatetoll'); // Replace '/another-page' with the desired path of the destination page
    };
    // const handleBtnClickCloseduty = () => {
    //     history.push('/menu/home/startduty/digitalsign'); // Replace '/another-page' with the desired path of the destination page
    // };
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton className='profile-back-button' onClick={handleBack}>
                            <IonIcon icon={chevronBackOutline} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Close Duty</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className='form-container-CloseDuty'>
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
                            <IonInput label='Contact Number :' type="tel" name="guestmobileno" value={userData.guestmobileno} onIonChange={handleInputChange} readonly />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonTextarea label='Address :' name="address1" value={userData.address1} onIonChange={handleInputChange} readonly />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Toll Charges :' name='toll' value={userData.toll} onIonChange={handleInputChange} readonly />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Parking Charges :' name='parking' value={userData.parking} onIonChange={handleInputChange} readonly />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Start Date :' name='startdate' value={userData.startdate} onIonChange={handleInputChange} readonly />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Start Time :' name='starttime' value={userData.starttime} onIonChange={handleInputChange} readonly />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Start Kilometers :' name='startkm' value={userData.startkm} onIonChange={handleInputChange} readonly />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Closing Date :' name='closedate' value={userData.closedate} onIonChange={handleInputChange} />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Closing Time :' name='closetime' value={userData.closetime} onIonChange={handleInputChange} />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Closing Kilometers :' name='closekm' value={userData.closekm} onIonChange={handleInputChange} />
                        </IonItem>
                        <IonItem>
                            <IonCheckbox aria-required />
                            Above Mentioned value are correct
                        </IonItem>
                        <IonButton className='booking-accept-btn' expand='block' onClick={handleBtnClickCloseduty} size='small' type='submit' >
                            Close Duty
                        </IonButton>
                        <IonButton onClick={handleBtnClickToll} className='accept-btn' size='small'>Upload-Toll / Parking</IonButton>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default CloseDuty;
