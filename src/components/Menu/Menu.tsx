import React, { useState } from 'react';
import './Menu.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonPage, IonRouterOutlet } from '@ionic/react';
import { settingsOutline, locationOutline, homeOutline, receiptOutline } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';

import Home from './Home';
import Location from './Location';
import Settings from './Settings';
import TripSheet from './TripSheet';

const Menu: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Menu1');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <IonPage>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Switch>
              <Route exact path="/menu/home" component={Home} />
              <Route exact path="/menu/tripsheet" component={TripSheet} />
              <Route exact path="/menu/location" component={Location} />
              <Route exact path="/menu/setting" component={Settings} />
              <Redirect exact from="/menu" to="/menu/home" />
            </Switch>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton
              tab="Menu1"
              href="/menu/home"
              className={`Menu-Button ${activeTab === 'Menu1' ? 'active' : ''}`}
              onClick={() => handleTabChange('Menu1')}
            >
              <IonIcon className={`Menu-icon ${activeTab === 'Menu1' ? 'active' : ''}`} icon={homeOutline} />
              <div className={`Menu-lable ${activeTab === 'Menu1' ? 'active' : ''}`}>
                <IonLabel>Home</IonLabel>
              </div>
            </IonTabButton>
            <IonTabButton
              tab="Menu2"
              href="/menu/tripsheet"
              className={`Menu-Button ${activeTab === 'Menu2' ? 'active' : ''}`}
              onClick={() => handleTabChange('Menu2')}
            >
              <IonIcon className={`Menu-icon ${activeTab === 'Menu2' ? 'active' : ''}`} icon={receiptOutline} />
              <div className={`Menu-lable ${activeTab === 'Menu2' ? 'active' : ''}`}>
                <IonLabel>Trip Sheet</IonLabel>
              </div>
            </IonTabButton>
            <IonTabButton
              tab="Menu3"
              href="/menu/location"
              className={`Menu-Button ${activeTab === 'Menu3' ? 'active' : ''}`}
              onClick={() => handleTabChange('Menu3')}
            >
              <IonIcon className={`Menu-icon ${activeTab === 'Menu3' ? 'active' : ''}`} icon={locationOutline} />
              <div className={`Menu-lable ${activeTab === 'Menu3' ? 'active' : ''}`}>
                <IonLabel>Location</IonLabel>
              </div>
            </IonTabButton>
            <IonTabButton
              tab="Menu4"
              href="/menu/setting"
              className={`Menu-Button ${activeTab === 'Menu4' ? 'active' : ''}`}
              onClick={() => handleTabChange('Menu4')}
            >
              <IonIcon className={`Menu-icon ${activeTab === 'Menu4' ? 'active' : ''}`} icon={settingsOutline} />
              <div className={`Menu-lable ${activeTab === 'Menu4' ? 'active' : ''}`}>
                <IonLabel>Settings</IonLabel>
              </div>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonPage>
  );
}

export default Menu;
