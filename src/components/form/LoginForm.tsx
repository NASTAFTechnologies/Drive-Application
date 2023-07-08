import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Form.css';
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
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('Admin@321');
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth');
    if (isAuthenticated) {
      history.replace('/menu');
    }
  }, [history]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === 'admin@gmail.com' && password === 'Admin@321') {
      setTimeout(() => {
        localStorage.setItem('auth', 'true');
        setShowLoginSuccess(true);
      }, 2000);
    } else {
      console.log('Invalid login credentials');
    }
  };

  const handleLoginSuccessAlertClose = () => {
    setEmail('');
    setPassword('');
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
            <form onSubmit={handleLogin}>
              <h1>Login</h1>
              <div className="form-input">
                <div className="icon">
                  <IonIcon icon={mailOutline} />
                </div>
                <IonInput
                  className="custom-input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
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
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
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
        message="You have successfully logged in!"
        buttons={['OK']}
      />
    </IonPage>
  );
};

export default Login;
