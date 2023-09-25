import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonInput,
    IonCheckbox,
    IonItem,
    IonList,
    useIonToast,
    IonIcon,
} from '@ionic/react';
import './UpdateToll.css';
import { useHistory } from 'react-router-dom';
import { chevronBackOutline } from 'ionicons/icons';

const UpdateToll: React.FC = () => {
    const history = useHistory();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedFile2, setSelectedFile2] = useState<File | null>(null);
    // const [toll, setToll] = useState<string | null>(null);
    // const [parking, setParking] = useState<string | null>(null);
    const [inputData, setInputData] = useState({
        toll: '',
        parking: '',
    });
    const [present] = useIonToast();


    useEffect(() => {
        const isAuthenticated = localStorage.getItem('auth');
        if (!isAuthenticated) {
            history.replace('/'); // Redirect to the login page if not authenticated
        }
    }, [history]);

    const handleBack = () => {
        history.push('/menu/home/closebooking/closeduty');
    };

    const presentToast = (position: 'top' | 'middle' | 'bottom') => {
        present({
            message: 'File Uploaded Successfully!',
            duration: 1500,
            position: position,
        });
    };

    const handleUpload = (fieldName: 'toll') => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf, .jpg, .jpeg, .png';
        input.onchange = (event: Event) => {
            const changeEvent = event as unknown as React.ChangeEvent<HTMLInputElement>;
            handleFileChange(changeEvent, fieldName);
        };
        input.click();
    };

    const handleUpload2 = (fieldName: 'parking') => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf, .jpg, .jpeg, .png';
        input.onchange = (event: Event) => {
            const changeEvent = event as unknown as React.ChangeEvent<HTMLInputElement>;
            handleFileChange2(changeEvent, fieldName);
        };
        input.click();
    };

    // const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, fieldName: 'toll' | 'parking') => {
    //     const file = event.target.files?.[0];
    //     if (!file) return;
    //     const formData = new FormData();
    //     formData.append('file', file);
    //     try {
    //         const response = await axios.post(`http://localhost:8081/uploads`, formData);
    //         console.log(response.data);
    //         presentToast('top');
    //         setSelectedFile(file);
    //     } catch (error) {
    //         console.error(`Error uploading ${fieldName} file:`, error);
    //     }
    // };
    const handleFileChange2 = async (event: React.ChangeEvent<HTMLInputElement>, fieldName: 'toll' | 'parking') => {
        const file = event.target.files?.[0];
        if (!file) return;
        
        const selecteeTripid = localStorage.getItem('selectTripid'); // Get the tripid from localStorage
        
        const formData = new FormData();
        formData.append('file', file);
        
        if (selecteeTripid) {
            formData.append('tripid', selecteeTripid); // Include the tripid in the FormData if it's not null
        }
        
        try {
            const response = await axios.post(`http://localhost:8081/uploads`, formData);
            console.log(response.data);
            presentToast('top');
            setSelectedFile2(file);
        } catch (error) {
            console.error(`Error uploading ${fieldName} file:`, error);
        }
    };
    
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, fieldName: 'toll' | 'parking') => {
        const file = event.target.files?.[0];
        if (!file) return;
    
        const selecteTripid = localStorage.getItem('selectTripid'); // Get the tripid from localStorage
    
        const formData = new FormData();
        formData.append('file', file);
        
        if (selecteTripid) {
            formData.append('tripid', selecteTripid); // Include the tripid in the FormData if it's not null
        }
    
        try {
            const response = await axios.post(`http://localhost:8081/uploads`, formData);
            console.log(response.data);
            presentToast('top');
            setSelectedFile(file);
        } catch (error) {
            console.error(`Error uploading ${fieldName} file:`, error);
        }
    };
    

    const handleInputChange = (e: CustomEvent) => {
        const { name, value } = e.target as HTMLInputElement;
        console.log(`Input Name: ${name}, Input Value: ${value}`);
        setInputData((prevInputData) => ({
            ...prevInputData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        const tripid = localStorage.getItem('selectTripid');
        const updatedData = {
            tripid: tripid,
            toll: inputData.toll,// Include both toll and parking in the request data
            parking: inputData.parking, // Include parking
        };
        console.log(updatedData);
        axios
            .post('http://localhost:8081/update_updatetrip', updatedData)
            .then((response) => {
                console.log('Update successful:', response.data);
                presentToast('top');
                history.push('/menu/home');
            })
            .catch((error) => {
                console.error('Error updating status:', error);
                presentToast('top');
            });
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton className="profile-back-button" onClick={handleBack}>
                            <IonIcon icon={chevronBackOutline} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Update Toll & Parking</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="container-file-upload">
                    <IonList>
                        <IonItem>
                            <IonInput
                                label="Enter Toll Amount"
                                name='toll'
                                labelPlacement="floating"
                                value={inputData.toll}
                                onIonChange={handleInputChange}
                                required
                            ></IonInput>
                        </IonItem>
                        <div className="File-upload-btn">
                            <input type="file" id="uploadTollInput" style={{ display: 'none' }} />
                            <IonButton size="small" onClick={() => handleUpload('toll')}>
                                Upload Toll Bill
                            </IonButton>
                            {selectedFile && (
                                <div>
                                    Uploaded Toll Bill: {selectedFile.name}
                                </div>
                            )}
                        </div>
                        <IonItem>
                            <IonInput
                                label="Enter parking Amount"
                                name="parking" // Ensure that the name matches the key in the request body
                                labelPlacement="floating"
                                value={inputData.parking}
                                onIonChange={handleInputChange}
                                required
                            ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonCheckbox aria-label='Entered amount is correcct' aria-required />
                        </IonItem>
                        <div className="File-upload-btn">
                            <input type="file" id="uploadParkingInput" style={{ display: 'none' }} />
                            <IonButton size="small" onClick={() => handleUpload2('parking')}>
                                Upload Parking Bill
                            </IonButton>
                            {selectedFile2 && (
                                <div>
                                    Uploaded Parking Bill: {selectedFile2.name}
                                </div>
                            )}
                        </div>
                    </IonList>
                    <IonButton expand="full" onClick={handleSubmit}>
                        Submit
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default UpdateToll;
