import React from "react";
import { IonTabs } from "@ionic/react";

interface MainTabsProps {}

const MainTabs: React.FC<MainTabsProps> = () => {
  return (
    <IonTabs>
      Ys
      {/* <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/home" />
        <Route path="/tabs/products" component={ListProduct} exact={true} />
        <Route
          path="/tabs/products/:id"
          component={DetailProduct}
          exact={true}
        />
        <Route
          path="/tabs/resources"
          render={() => <ResourcePage />}
          exact={true}
        />

        <Route path="/tabs/sells" component={SellPage} exact={true} />
        <Route path="/tabs/sells/edit" component={EditSellPage} exact={true} />

        <Route
          path="/tabs/clients"
          render={() => <ClientPage />}
          exact={true}
        />
        <Route path="/tabs/home" component={HomePage} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="map" href="/tabs/home">
          <IonLabel> Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="products" href="/tabs/products">
          <IonLabel>Produits</IonLabel>
        </IonTabButton>
        <IonTabButton tab="sells" href="/tabs/sells">
          <IonLabel>Ventes</IonLabel>
        </IonTabButton>

        <IonTabButton tab="about" href="/tabs/clients">
          <IonLabel>Clients</IonLabel>
        </IonTabButton>
      </IonTabBar> */}
    </IonTabs>
  );
};

export default MainTabs;
