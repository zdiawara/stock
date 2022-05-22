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

import { MENU } from "../utils/menu";

import "./Menu.css";

const routes = {
  menu: [MENU.home],
  appPages: [MENU.products, MENU.mouvements, MENU.depenses, MENU.rapports],
  loggedInPages: [MENU.support, MENU.tutoriel],
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
      .map((p) => {
        const isSelected = location.pathname.startsWith(p.path);
        return (
          <IonMenuToggle key={p.title} auto-hide="false">
            <IonItem
              detail={false}
              routerLink={p.path}
              routerDirection="none"
              className={isSelected ? "selected" : undefined}
            >
              {p.icon && (
                <IonIcon
                  color={isSelected ? "primary" : "dark"}
                  slot="start"
                  icon={p.icon}
                />
              )}
              <IonLabel color={isSelected ? "primary" : "dark"}>
                {p.title}
              </IonLabel>
            </IonItem>
          </IonMenuToggle>
        );
      });
  }

  return (
    <IonMenu type="overlay" disabled={!menuEnabled} contentId="main">
      <IonContent forceOverscroll={false}>
        <IonList lines="none">
          <IonListHeader>Menu</IonListHeader>
          {renderlistItems(routes.menu)}
        </IonList>
        <IonList lines="none">
          <IonListHeader>Actions</IonListHeader>
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
