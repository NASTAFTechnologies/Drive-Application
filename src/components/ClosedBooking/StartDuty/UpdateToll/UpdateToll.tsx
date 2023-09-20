import React, { useEffect, useState } from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonInput,
    IonItem,
    IonList,
    useIonToast,
    IonIcon
} from '@ionic/react';
import './UpdateToll.css';
import { useHistory } from 'react-router-dom';
import { chevronBackOutline } from 'ionicons/icons';

const UpdateToll: React.FC = () => {
    const history = useHistory();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
    const handleFileUpload = (files: FileList | null) => {
        if (files && files.length > 0) {
            const file = files[0];
            setSelectedFile(file);
            console.log(file);
            presentToast('top'); // Show toast notification after file upload
        }
    };
    const presentToast = (position: 'top' | 'middle' | 'bottom') => {
        present({
            message: 'File Uploaded Successfully!',
            duration: 1500,
            position: position,
        });
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
                    <IonTitle>Update Toll & Parking</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="container-file-upload">
                    <IonList>
                        <IonItem>
                            <IonInput label="Enter Toll Amount" labelPlacement="floating" placeholder=""></IonInput>
                        </IonItem>
                    </IonList>
                    <div className="File-upload-btn">
                        <input
                            type="file"
                            id="uploadInput"
                            style={{ display: 'none' }}
                            onChange={(e) => handleFileUpload(e.target.files)}
                        />
                        <IonButton size='small' onClick={() => document.getElementById('uploadInput')?.click()}>
                            Upload  or Photo
                        </IonButton>
                        {selectedFile && (
                            <div>
                                Uploaded File: {selectedFile.name}
                            </div>
                        )}
                    </div>
                    <IonList>
                        <IonItem>
                            <IonInput type="number" label="Enter Parking Amount" labelPlacement="floating" placeholder=""></IonInput>
                        </IonItem>
                    </IonList>
                    <div className="File-upload-btn">
                        <input
                            type="file"
                            id="uploadInput"
                            style={{ display: 'none' }}
                            onChange={(e) => handleFileUpload(e.target.files)}
                        />
                        <IonButton size='small' onClick={() => document.getElementById('uploadInput')?.click()}>
                            Upload Bill PDF or Photo
                        </IonButton>
                        {selectedFile && (
                            <div>
                                Uploaded File: {selectedFile.name}
                            </div>
                        )}
                    </div>
                </div>
            </IonContent>
        </IonPage >
    );
};

export default UpdateToll;
