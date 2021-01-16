import React from "react";
import { RouteComponentProps, withRouter, useLocation } from "react-router";

import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from "@ionic/react";
import { hammer, helpCircle } from "ionicons/icons";

import "./Menu.css";

const routes = {
  appPages: [
    { title: "Produits", path: "/tabs/products" },
    { title: "Ventes", path: "/tabs/sells" },
    { title: "Clients", path: "/tabs/clients" },
  ],
  loggedInPages: [
    { title: "Support", path: "/support", icon: helpCircle },
    { title: "Tutoriel", path: "/logout", icon: hammer },
  ],
};

interface Pages {
  title: string;
  path: string;
  icon?: string;
  routerDirection?: string;
}
interface StateProps {
  menuEnabled: boolean;
}

interface MenuProps extends RouteComponentProps, StateProps {}

const Menu: React.FC<MenuProps> = ({ menuEnabled }) => {
  const location = useLocation();

  function renderlistItems(list: Pages[]) {
    return list
      .filter((route) => !!route.path)
      .map((p) => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem
            detail={false}
            routerLink={p.path}
            routerDirection="none"
            className={
              location.pathname.startsWith(p.path) ? "selected" : undefined
            }
          >
            {p.icon && <IonIcon slot="start" icon={p.icon} />}
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  }

  return (
    <IonMenu type="overlay" disabled={!menuEnabled} contentId="main">
      <IonContent forceOverscroll={false}>
        <IonList lines="none">
          <IonListHeader>Menu</IonListHeader>
          {renderlistItems(routes.appPages)}
        </IonList>
        <IonList lines="none">
          <IonListHeader>Autres</IonListHeader>
          {renderlistItems(routes.loggedInPages)}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
