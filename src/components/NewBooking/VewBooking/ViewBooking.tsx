import React, { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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
    IonIcon,
} from '@ionic/react';
import './ViewBooking.css'
import { useHistory } from 'react-router-dom'; // Import useHistory here
import { chevronBackOutline } from 'ionicons/icons';

const ViewBooking: React.FC = () => {
    const [present] = useIonToast();
    const history = useHistory(); // Use useHistory to get the history object
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
    });

    const handleInputChange = (e: CustomEvent) => {
        const { name, value } = e.detail;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('auth');
        if (!isAuthenticated) {
            history.replace('/'); // Redirect to the login page if not authenticated
        }
    }, [history]);

    const handleBack = () => {
        history.push('/menu/home/newbooking');
    };
    //change app status to accept
    const handleAccept = () => {
        // Create a payload with the updated data (e.g., changing the 'status' to 'accept')
        const updatedData = {
            tripid: userData.tripid,
            apps: 'Accept', // Update with the new status value
        };

        axios
            .post('http://localhost:8081/update_trip_apps', updatedData)
            .then((response) => {
                // Handle a successful response (e.g., show a confirmation message)
                console.log('Update successful:', response.data);
                presentToast('top'); // Show a success message
                history.push('/menu/home');
            })
            .catch((error) => {
                // Handle errors (e.g., show an error message)
                console.error('Error updating status:', error);
                presentToast('top',); // Show an error message
            });
    };
    //end

    const presentToast = (position: 'top' | 'middle' | 'bottom') => {
        present({
            message: 'Your Duty Was Started !',
            duration: 1500,
            position: position,
        });
    };
    //get duty type details based on login duty type and tripid
    useEffect(() => {
        // Retrieve duty type and tripid from localStorage
        const selectedDuty = localStorage.getItem('selectedDuty');
        const selectedTripid = localStorage.getItem('selectedTripid');

        // Check if duty type and tripid are available
        if (selectedDuty && selectedTripid) {
            // Fetch trip sheet details based on selectedDuty and selectedTripid
            axios
                .get(`http://localhost:8081/tripsheet/${selectedTripid}/${selectedDuty}`)
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
    //end
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton className='profile-back-button' onClick={handleBack}>
                            <IonIcon icon={chevronBackOutline} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>View Booking</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className='form-container'>
                    <form onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}>
                        <IonItem className='field-item'>
                            <IonInput label='Trip Sheet No :' name="tripid" onIonChange={handleInputChange} value={userData.tripid} readonly />
                        </IonItem>
                        <IonItem className='field-item'>
                            <IonInput label='Trip Date :' name="startdate" value={userData.startdate} onIonChange={handleInputChange} required />
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
                        <IonButton className="booking-accept-btn" expand="block" onClick={handleAccept} size="small" type="submit">Accept
                        </IonButton>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default ViewBooking;
