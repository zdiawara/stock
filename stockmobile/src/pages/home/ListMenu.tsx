import React from "react";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonList,
  IonListHeader,
  IonRow,
} from "@ionic/react";

import MenuItem from "./MenuItem";

import "./ListMenu.scss";
import { MENU } from "../../utils/menu";
import {
  addCircleOutline,
  addOutline,
  removeCircleOutline,
  removeOutline,
} from "ionicons/icons";

const DATA = [MENU.products, MENU.mouvements, MENU.depenses, MENU.rapports];

const ListMenu: React.FC = () => {
  return (
    <>
      <IonList>
        <IonListHeader>Menu</IonListHeader>
        <IonGrid>
          <IonRow>
            {DATA.map((item, i) => (
              <IonCol size="6" key={i}>
                <MenuItem {...item} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonList>
      <IonList>
        <IonListHeader>Racourcis</IonListHeader>
        <IonGrid>
          <IonRow>
            <IonCol size="4">
              <MenuItem icon={removeCircleOutline} path={"/"} title="Sortie" />
            </IonCol>
            <IonCol size="4">
              <MenuItem icon={addCircleOutline} path={"/"} title="Entrée" />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonList>
    </>
  );
};

export default ListMenu;
