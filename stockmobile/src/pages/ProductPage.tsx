import React, { useEffect, useState } from "react";

import {
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonTitle,
  IonMenuButton,
  IonHeader,
  IonList,
  IonItem,
  IonThumbnail,
  IonImg,
  IonLabel,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
} from "@ionic/react";
import { add } from "ionicons/icons";

type Item = {
  src: string;
  text: string;
};
const items: Item[] = [
  { src: "http://placekitten.com/g/200/300", text: "a picture of a cat" },
  { src: "http://placekitten.com/g/200/300", text: "a picture of a cat" },
  { src: "http://placekitten.com/g/200/300", text: "a picture of a cat" },
];

const ProductPage: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log("Produits");
  }, []);

  return (
    <IonPage id="product-page">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Produits</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonList>
          {items.map((image, i) => (
            <IonItem href="tabs/products/45" button lines="full" detail key={i}>
              <IonThumbnail slot="start">
                <IonImg src={image.src} />
              </IonThumbnail>
              <IonLabel>
                <h2>Fefe</h2>
                <p>20 articles</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShow(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        <IonModal
          isOpen={show}
          onDidDismiss={() => setShow(false)}
          swipeToClose={true}
          //presentingElement={pageRef.current!}
          //cssClass="session-list-filter"
        >
          OK
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default ProductPage;
