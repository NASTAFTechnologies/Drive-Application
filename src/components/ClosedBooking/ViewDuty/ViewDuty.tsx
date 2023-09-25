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
    IonButton,
    useIonToast,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonIcon,
} from '@ionic/react';
import './ViewDuty.css';
import { useHistory } from 'react-router-dom';
import { chevronBackOutline } from 'ionicons/icons';

const ViewDuty: React.FC = () => {
    const [present] = useIonToast();
    const [uploadedImagePath, setuploadedImagePath] = useState('');
    const [attachedImagePath, setattachedImagePath] = useState('');

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
        closedate: '',
        closetime: '',
        closekm: '',
        advancepaidtovendor: '',
        parking: '',
    });
    //get signature image
    useEffect(() => {
        const selecteTripid = localStorage.getItem('selectTripid');
        if (selecteTripid) {
            axios.get(`http://localhost:8081/signature_photos?tripid=${selecteTripid}`)
                .then((response) => {
                    const uploadedImagePath = response.data.uploadedImagePath.replace(/\\/g, '/');
                    console.log('Profile Image Path:', uploadedImagePath);
                    setuploadedImagePath(uploadedImagePath);
                    console.log('summa path kattu', uploadedImagePath);
                })
                .catch((error) => {
                    console.error('Error fetching profile photo path:', error);
                });
        }
    }, []);
    //get attached image
    useEffect(() => {
        const selecteTripid = localStorage.getItem('selectTripid');
        if (selecteTripid) {
            axios.get(`http://localhost:8081/uploads?tripid=${selecteTripid}`)
                .then((response) => {
                    const attachedImagePath = response.data.attachedImagePath.replace(/\\/g, '/');
                    console.log('Profile Image Path:', attachedImagePath);
                    setattachedImagePath(attachedImagePath);
                    console.log('attached path', attachedImagePath);
                })
                .catch((error) => {
                    console.error('Error fetching profile photo path:', error);
                });
        }
    }, []);


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

    const handleInputChange = (e: CustomEvent) => {
        const { name, value } = e.detail;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    const presentToast = (position: 'top' | 'middle' | 'bottom') => {
        present({
            message: 'Your Booking Was Accepted!',
            duration: 1500,
            position: position,
        });
    };


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                        <IonButton className='profile-back-button' onClick={handleBack}>
                            <IonIcon icon={chevronBackOutline} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>View Duty</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className='form-container-ViewDuty'>
                    <h1 className='trip-Title'>Trip Details</h1>
                    <form onSubmit={handleSubmit}>
                        <IonItem className='field-item'>
                            <IonInput label='Trip Sheet No :' name="tripid" onIonChange={handleInputChange} value={userData.tripid} readonly />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Trip Date :' name="startdate" value={userData.startdate} onIonChange={handleInputChange} required />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Start Time :' name="starttime" value={userData.starttime} onIonChange={handleInputChange} required />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Start Kilometers :' name='startkm' value={userData.startkm} onIonChange={handleInputChange} required />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Closing Date :' name='closedate' value={userData.closedate} onIonChange={handleInputChange} required />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Closing Time :' name='closetime' value={userData.closetime} onIonChange={handleInputChange} required />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Closing Kilometers :' name='closekm' value={userData.closekm} onIonChange={handleInputChange} required />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Guest Name :' name="guestname" value={userData.guestname} readonly />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Contact Number :' name="guestmobileno" value={userData.guestmobileno} onIonChange={handleInputChange} readonly />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Vehicle Type :' name="vehType" value={userData.vehType} readonly />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Company Name ' name="customer" value={userData.customer} readonly />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Advance :' name='advancepaidtovendor' value={userData.advancepaidtovendor} onIonChange={handleInputChange} required />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Toll :' name='toll' value={userData.toll} onIonChange={handleInputChange} required />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Parking :' name='parking' value={userData.parking} onIonChange={handleInputChange} required />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonTextarea label='Address :' name='address1' value={userData.address1} onIonChange={handleInputChange} readonly />
                        </IonItem>
                    </form>
                </div>
                <div className="Uploaded-img">
                    <div className='Sig-btn'>
                        <IonButton
                            className='accept-btn'
                            expand='block'
                            type='submit'
                        >
                            Signature
                        </IonButton>
                    </div>
                    <IonCard>
                        <img alt="Signature Image" src={`../../../../Backend/server/${uploadedImagePath}`} />
                        <IonCardHeader>
                            <IonCardTitle>Signature Image</IonCardTitle>
                        </IonCardHeader>
                    </IonCard>
                    <div className='Attachment-btn'>
                        <IonButton
                            className='accept-btn'
                            expand='block'
                            type='submit'
                        >
                            Attachments
                        </IonButton>
                    </div>
                    <IonCard>
                        <img alt="Signature Image" src={`../../../../Backend/server/${attachedImagePath}`} />
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
