import React, { useEffect, useState } from 'react';
import './Menu.css';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonPage,
} from '@ionic/react';
import {
  homeOutline,
  receiptOutline,
  cogOutline,
} from 'ionicons/icons';

// Import your components
import Settings from '../Settings/Settings';
import TripSheet from '../History/History';
import NewBooking from '../NewBooking/NewBooking';
import ViewBooking from '../NewBooking/VewBooking/ViewBooking';
import Home from '../Home/Home';
import Profile from '../Settings/Profile/Profile';
import ClosedBooking from '../ClosedBooking/ClosedBooking';
import StartDuty from '../ClosedBooking/StartDuty/StartDuty';
import CloseDuty from '../ClosedBooking/CloseDuty/CloseDuty';
import ViewDuty from '../ClosedBooking/ViewDuty/ViewDuty';
import UpdateToll from '../ClosedBooking/StartDuty/UpdateToll/UpdateToll';
import DigitalSignature from '../ClosedBooking/Digitalsignature/DigitalSignature';

const Menu: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Menu1');
  const history = useHistory(); // Get the history object

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    switch (tab) {
      case 'Menu1':
        history.push('/menu/home');
        break;
      case 'Menu2':
        history.push('/menu/tripsheet');
        break;
      case 'Menu3':
        break;
      case 'Menu4':
        history.push('/menu/setting');
        break;
      default:
        break;
    }
  };

  // Dark Mode & Light Mode
  useEffect(() => {
    const colorModeListener = (e: MediaQueryListEvent | MediaQueryList) => {
      const rootElement = document.documentElement;
      rootElement.classList.remove('dark', 'light');
      rootElement.classList.add(e.matches ? 'dark' : 'light');
    };

    const colorModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    colorModeListener(colorModeQuery); // Set initial class based on current color mode
    colorModeQuery.addListener(colorModeListener); // Listen for changes in color mode

    return () => {
      colorModeQuery.removeListener(colorModeListener); // Clean up the listener when the component unmounts
    };
  }, []);

  return (
    <IonPage>
      <IonTabs className='white'>
        <IonRouterOutlet>
          <Switch>
            <Route exact path="/menu/home" component={Home} />
            <Route exact path="/menu/home/newbooking" component={NewBooking} />
            <Route exact path="/menu/home/viewbooking" component={ViewBooking} />
            <Route exact path="/menu/home/closebooking" component={ClosedBooking} />
            <Route exact path="/menu/home/closebooking/startduty" component={StartDuty} />
            <Route exact path="/menu/home/startduty/updatetoll" component={UpdateToll} />
            <Route exact path="/menu/home/startduty/digitalsign" component={DigitalSignature} />
            <Route exact path="/menu/home/closebooking/closeduty" component={CloseDuty} />
            <Route exact path="/menu/home/closebooking/viewduty" component={ViewDuty} />
            <Route exact path="/menu/tripsheet" component={TripSheet} />
            {/* <Route exact path="/menu/location" component={Location} /> */}
            <Route exact path="/menu/setting" component={Settings} />
            <Route exact path="/menu/settings/profile" component={Profile} />
            <Route exact path="/menu">
              <Redirect to="/menu/tripsheet" />
              {/* <Redirect to="/menu/location" /> */}
              <Redirect to="/menu/setting" />
              <Redirect to="/menu/settings/profile" />
              <Redirect to="/menu/home/newbooking" />
              <Redirect to="/menu/home/viewbooking" />
              <Redirect to="/menu/home" />
            </Route>
          </Switch>
        </IonRouterOutlet>
        <IonTabBar slot="bottom" className={`tab-bar-menu`}>
          <IonTabButton
            tab="Menu1"
            href="/menu/home"
            className={`Menu-Button ${activeTab === 'Menu1' ? 'active' : ''}`}
            onClick={() => handleTabChange('Menu1')}
          >
            <IonIcon className={`Menu-icon ${activeTab === 'Menu1' ? 'active' : ''}`} icon={homeOutline} />
          </IonTabButton>
          <IonTabButton
            tab="Menu2"
            href="/menu/tripsheet"
            className={`Menu-Button ${activeTab === 'Menu1' ? 'active' : ''}`}
            onClick={() => handleTabChange('Menu2')}
          >
            <IonIcon className={`Menu-icon ${activeTab === 'Menu1' ? 'active' : ''}`} icon={receiptOutline} />
          </IonTabButton>
          {/* Uncomment and add your Location tab button here */}
          {/* <IonTabButton
            tab="Menu3"
            href="/menu/location"
            className={`Menu-Button ${activeTab === 'Menu2' ? 'active' : ''}`}
            onClick={() => handleTabChange('Menu3')}
          >
            <IonIcon className={`Menu-icon ${activeTab === 'Menu2' ? 'active' : ''}`} icon={locationOutline} />
            <div className={`Menu-lable ${activeTab === 'Menu2' ? 'active' : ''}`}>
              <IonLabel>Location</IonLabel>
            </div>
          </IonTabButton> */}
          <IonTabButton
            tab="Menu4"
            href="/menu/setting"
            className={`Menu-Button  ${activeTab === 'Menu3' ? 'active' : ''}`}
            onClick={() => handleTabChange('Menu4')}
          >
            <IonIcon className={`Menu-icon ${activeTab === 'Menu3' ? 'active' : ''}`} icon={cogOutline} />
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonPage>
  );
};

export default Menu;