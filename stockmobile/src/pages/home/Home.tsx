import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import ListMenu from "./ListMenu";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>G Stock</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ListMenu />
      </IonContent>
    </IonPage>
  );
};

export default Home;
