import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, IonPage } from '@ionic/react';
import { ellipse, triangle } from 'ionicons/icons';
import Menu1 from './Menu1';
import Menu2 from './Menu2';
import Details from './Details';

const Menu: React.FC = () => {
  return (
    <IonPage >
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/menu/menu1" component={Menu1} />
          <Route exact path="/menu/menu2" component={Menu2} />
          <Route exact path="/menu/menu3" component={Details} />
          <Route exact path="/menu">
            <Redirect to="/menu/menu1" />
            <Redirect to="/menu/menu2" />
            <Redirect to="/menu/menu3" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="Menu1" href="/menu/menu1">
            <IonIcon icon={ellipse} />
            <IonLabel>Menu1</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Menu2" href="/menu/menu2">
            <IonIcon icon={triangle} />
            <IonLabel>Menu2</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Menu3" href="/menu/menu3">
            <IonIcon icon={ellipse} />
            <IonLabel>Menu3</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonPage>
  );
}

export default Menu;
