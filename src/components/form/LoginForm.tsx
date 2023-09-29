import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Form.css';
import axios from "axios"; // Import Axios for making HTTP requests


import {
  IonContent,
  IonInput,
  IonButton,
  IonAlert,
  IonIcon,
  IonPage,
} from '@ionic/react';
import { mailOutline } from 'ionicons/icons';
import {
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
} from 'ionicons/icons';

const Login: React.FC = () => {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [input, setInput] = React.useState({ username: "", userpassword: "" });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth');
    if (isAuthenticated) {
      history.replace('/menu');
    }
  }, [history]);
  const [username] = useState("");
  const formSubmitter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setSuccess("");
    try {
      const response = await axios.post("http://localhost:8081/login", input); // Make a POST request to your backend

      if (response.status === 200) {
        setShowLoginSuccess(true);
        localStorage.setItem('loggedInUsername', input.username);
        localStorage.setItem('userId', username);

        localStorage.setItem("auth", 'true');
      } else {
        // Failed login
      }
    } catch (error) {
      // setError("An error occurred while logging in.");
    }
  };

  const handleLoginSuccessAlertClose = () => {
    setShowLoginSuccess(false);
    setTimeout(() => {
      history.push('/menu'); // Redirect to /menu route
    }, 0);
  };

  return (
    <IonPage>
      <IonContent>
        <div className="login-container">
          <div className="glasses">
            <form onSubmit={formSubmitter}>
              <h1>Login</h1>
              <div className="form-input">
                <div className="icon">
                  <IonIcon icon={mailOutline} />
                </div>
                <IonInput
                  className="custom-input"
                  type="text"
                  placeholder="Email"
                  name='username'
                  onIonChange={(e) => setInput({ ...input, username: e.detail.value! })}
                  required
                ></IonInput>
              </div>
              <div className="form-input">
                <div className="icon">
                  <IonIcon icon={lockClosedOutline} />
                </div>
                <IonInput
                  className="custom-input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  name='userpassword'
                  onIonChange={(e) => setInput({ ...input, userpassword: e.detail.value! })}
                  required
                ></IonInput>
                <div
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  <IonIcon
                    icon={showPassword ? eyeOffOutline : eyeOutline}
                  />
                </div>
              </div>
              <div className="action-btn">
                <IonButton
                  className="Login-btn"
                  expand="block"
                  type="submit"
                >
                  Login
                </IonButton>
                <p>Forgotten Password?</p>
              </div>
            </form>
          </div>
        </div>
      </IonContent>
      <IonAlert
        isOpen={showLoginSuccess}
        onDidDismiss={handleLoginSuccessAlertClose}
        header="Success"
        message="You have successfully logged in"
        buttons={['OK']}
      />
    </IonPage>
  );
};

export default Login;
