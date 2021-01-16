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

const ProductPage: React.FC = () => {
  useEffect(() => {
    console.log("resources");
  }, []);

  return (
    <IonPage id="resource-page">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Ressources</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}></IonContent>
    </IonPage>
  );
};

export default ProductPage;
