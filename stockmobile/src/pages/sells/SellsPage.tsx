import React, { useEffect } from "react";

import {
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonTitle,
  IonMenuButton,
  IonHeader,
  IonItem,
  IonLabel,
  IonBadge,
  IonDatetime,
  IonFab,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { addCircleSharp } from "ionicons/icons";

const SellsPage: React.FC = () => {
  useEffect(() => {
    console.log("ventes");
  }, []);

  return (
    <IonPage id="sell-page">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Ventes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonItem lines="full">
          <IonLabel>Les ventes du</IonLabel>
          <IonDatetime
            displayFormat="DD/MM/YYYY"
            min="1989-06-04"
            max="2004-08-23"
            value="2020"
            // onIonChange={(e) => setSelectedDate(e.detail.value!)}
          />
        </IonItem>
        <IonItem button detail lines="full">
          <IonLabel style={{ padding: "5px 0" }}>
            <h3>Vente 1 : Fèfè, Piment</h3>
            <IonBadge style={{ marginTop: 10 }} color="light">
              2400 frs
            </IonBadge>
          </IonLabel>
        </IonItem>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonButton
            style={{ textTransform: "none" }}
            shape="round"
            routerLink="/tabs/sells/edit"
          >
            <IonIcon slot="start" icon={addCircleSharp} />
            Ajouter une vente
          </IonButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default SellsPage;
