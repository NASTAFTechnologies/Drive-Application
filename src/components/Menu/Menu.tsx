import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, IonPage } from '@ionic/react';
import { settingsOutline, locationOutline, homeOutline } from 'ionicons/icons';
import Home from './Home';
import Menu2 from './Menu2';
import Settings from './Settings';

const Menu: React.FC = () => {
  return (
    <IonPage >
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/menu/home" component={Home} />
          <Route exact path="/menu/location" component={Menu2} />
          <Route exact path="/menu/setting" component={Settings} />
          <Route exact path="/menu">
            <Redirect to="/menu/home" />
            <Redirect to="/menu/location" />
            <Redirect to="/menu/setting" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="Menu1" href="/menu/home">
            <IonIcon icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Menu2" href="/menu/location">
            <IonIcon icon={locationOutline} />
            <IonLabel>Loction</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Menu3" href="/menu/setting">
            <IonIcon icon={settingsOutline} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonPage>
  );
}

export default Menu;
