import React, { useEffect, useState } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonBackButton, IonCardTitle, IonIcon } from '@ionic/react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons } from '@ionic/react';
import { useHistory } from "react-router-dom";
import { chevronBackOutline } from 'ionicons/icons';
import axios from 'axios';
import './NewBooking.css';

const NewBooking: React.FC = () => {
    const history = useHistory();
    const [bookings, setBookings] = useState<Booking[]>([]);
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
    // Fetch the driver's bookings when the component mounts
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('auth');
        if (!isAuthenticated) {
            history.replace('/'); // Redirect to the login page if not authenticated
        } else {
            const loggedInUsername = localStorage.getItem('loggedInUsername');
            axios.get(`http://localhost:8081/tripsheet/${loggedInUsername}`)
                .then((response) => {
                    console.log('Response data:', response.data); // Log the response data
                    setBookings(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching newbookings:", error);
                });
        }
    }, [history]);

    interface Booking {
        tripid: number;
        duty: string;
        startdate: string;
        apps: string;
    }
    useEffect(() => {
        const [tripid, duty] = history.location.pathname.split('/').slice(-2); // Extract tripid and duty from the URL
        // Fetch trip sheet details based on tripid and duty
        axios.get(`http://localhost:8081/tripsheet/${tripid}/${duty}`)
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching trip sheet details:', error);
            });
    }, [history]);

    const handleCardClickBooking = (tripid: number, duty: string) => {
        localStorage.setItem('selectedDuty', duty);
        localStorage.setItem('selectedTripid', tripid.toString());
        history.push(`/menu/home/viewbooking/`);
    };
    const handleBack = () => {
        history.push("/menu");
    };

    //for status color change
    function getStatusColorClass(status: string) {
        switch (status) {
            case 'Accept':
                return 'green-status';
            case 'Waiting':
                return 'orange-status';
            case 'closed':
                return 'red-status';
            default:
                return ''; // Default class or no class if status doesn't match
        }
    }
    return (
        <IonPage >
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton className='profile-back-button' onClick={handleBack}>
                            <IonIcon icon={chevronBackOutline} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>New Booking</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {bookings.map((booking) => (
                    <IonCard key={booking.tripid} onClick={() => handleCardClickBooking(booking.tripid, booking.duty)}>
                        <IonCardHeader>
                            <IonCardTitle>{booking.duty}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>{booking.startdate}</IonCardContent>
                        <span id="car-status" className={getStatusColorClass(booking.apps)}>{booking.apps}</span>
                    </IonCard>
                ))}
            </IonContent>
        </IonPage>
    );
};

export default NewBooking;
