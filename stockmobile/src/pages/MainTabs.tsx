import React from "react";
import {
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { Route, Redirect } from "react-router";
import ListProduct from "./products/ListProduct";
import ResourcePage from "./ResourcePage";
import SellPage from "./sells/SellsPage";
import ClientPage from "./clients/ClientsPage";
import DetailProduct from "./products/DetailProduct";
import EditSellPage from "./sells/EditSellPage";
import HomePage from "./HomePage";

interface MainTabsProps {}

const MainTabs: React.FC<MainTabsProps> = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/home" />
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
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
          {/* <IonIcon icon={personCircle} /> */}
          <IonLabel> Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="products" href="/tabs/products">
          {/* <IonIcon icon={calendar} /> */}
          <IonLabel>Produits</IonLabel>
        </IonTabButton>
        <IonTabButton tab="sells" href="/tabs/sells">
          {/* <IonIcon icon={people} /> */}
          <IonLabel>Ventes</IonLabel>
        </IonTabButton>

        <IonTabButton tab="about" href="/tabs/clients">
          {/* <IonIcon icon={informationCircle} /> */}
          <IonLabel>Clients</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
