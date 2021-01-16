import React, { useEffect } from "react";

import {
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonTitle,
  IonMenuButton,
  IonHeader,
} from "@ionic/react";

const ClientsPage: React.FC = () => {
  useEffect(() => {
    console.log("Client");
  }, []);

  return (
    <IonPage id="client-page">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Client</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        Tr
      </IonContent>
    </IonPage>
  );
};

export default ClientsPage;
