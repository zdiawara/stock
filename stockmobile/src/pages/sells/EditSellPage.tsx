import React, { FC } from "react";

import {
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonTitle,
  IonHeader,
  IonItem,
  IonLabel,
  IonBadge,
  IonListHeader,
  IonBackButton,
  IonNote,
  IonGrid,
  IonCol,
  IonRow,
} from "@ionic/react";
import { useModal } from "../../hooks";
import ProductSell from "./ProductSell";
import Modal from "../../components/Modal";

type ItemProps = {
  label: string;
  value: string | number;
};
const Item: FC<ItemProps> = ({ label, value }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
      <IonBadge style={{ marginRight: 5 }} color="light">
        {label}
      </IonBadge>
      <IonNote>{value}</IonNote>
    </div>
  );
};
const EditSellPage: React.FC = () => {
  const editSellModal = useModal();

  return (
    <IonPage id="edit-sell">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Nouvelle vente</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonListHeader>Client</IonListHeader>
        <IonItem button color="light" lines="full">
          Ajouter un client
        </IonItem>

        <IonListHeader>Produits vendus</IonListHeader>

        <IonItem lines="full">
          <IonLabel>Piment</IonLabel>
        </IonItem>
        <IonItem lines="inset" detail>
          <IonLabel>
            <h3>Poudre</h3>
            <IonGrid>
              <IonRow>
                <IonCol size="4">
                  <Item label="Qte" value="2" />
                </IonCol>
                <IonCol size="4">
                  <Item label="PV" value="2 500" />
                </IonCol>
                <IonCol size="4">
                  <Item label="RAP" value="500" />
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonLabel>
        </IonItem>
        <IonItem lines="inset" detail>
          <IonLabel>
            <h3>Graine</h3>
            <IonGrid>
              <IonRow>
                <IonCol size="4">
                  <Item label="Qte" value="2" />
                </IonCol>
                <IonCol size="4">
                  <Item label="PV" value="1 500" />
                </IonCol>
                <IonCol size="4">
                  <Item label="RAP" value="500" />
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonLabel>
        </IonItem>

        <IonItem lines="full">
          <IonLabel>Curry</IonLabel>
        </IonItem>
        <IonItem detail lines="inset">
          <IonLabel>
            <h3>Graine</h3>
            <IonGrid>
              <IonRow>
                <IonCol size="4">
                  <Item label="Qte" value="2" />
                </IonCol>
                <IonCol size="4">
                  <Item label="PV" value="100" />
                </IonCol>
                <IonCol size="4">
                  <Item label="RAP" value="500" />
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonLabel>
        </IonItem>

        <IonItem
          button
          color="light"
          lines="full"
          onClick={editSellModal.openModal}
        >
          Ajouter un produit
        </IonItem>
      </IonContent>

      <Modal {...editSellModal}>
        <ProductSell
          onUpdated={() => {}}
          closeModal={editSellModal.closeModal}
        />
      </Modal>
    </IonPage>
  );
};

export default EditSellPage;
