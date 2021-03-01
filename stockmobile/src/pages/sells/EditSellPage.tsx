import React, { FC, useEffect, useRef, useState } from "react";

import {
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonTitle,
  IonHeader,
  IonItem,
  IonLabel,
  IonBackButton,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { useModal } from "../../hooks";
import Modal from "../../components/Modal";

import "./Table.scss";
import { addCircle } from "ionicons/icons";
import { ListProductSell, ProductSellForm } from "../../components/sell";
import { IProductSellState } from "../../types";
import sellStore from "../../database/sellStore";
import productSellStore from "../../database/productSellStore";
import { useDispatch } from "react-redux";
import { addSell } from "../../redux/reducers/sells";
import { sumNumbers } from "../../utils/functions";
import { useHistory } from "react-router";

type ISellItem = {
  client?: string;
  products: IProductSellState[];
};

const EditSellPage: React.FC = () => {
  const editSellModal = useModal();
  const dispatch = useDispatch();
  const navigation = useHistory();
  const [sell, setSell] = useState<ISellItem>({
    client: undefined,
    products: [],
  });

  const addProduct = (data: IProductSellState) => {
    setSell((prev) => {
      return {
        ...prev,
        products: [
          ...prev.products,
          {
            ...data,
            discount: data.discount as number,
            total: data.total as number,
            quantity: data.quantity as number,
          },
        ],
      };
    });
  };

  const saveSell = async () => {
    const saved = await sellStore.save({
      client: "",
    });
    if (!saved._id) {
      return;
    }
    productSellStore.saveAll(
      sell.products.map((item) => ({
        discount: item.discount,
        total: item.total,
        quantity: item.quantity,
        product: item.product?._id || "",
        sell: saved._id || "",
      }))
    );

    dispatch(
      addSell({
        _id: saved._id,
        total: sumNumbers(sell.products.map((e) => e.price || 0)),
      })
    );
    navigation.goBack();
  };

  return (
    <IonPage id="edit-sell">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Nouvelle vente</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={saveSell}>Enregistrer</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonItem detail button lines="full">
          <IonLabel>
            <h3>Client</h3>
          </IonLabel>
        </IonItem>
        <IonItem lines="none">
          <IonLabel>Articles achetés</IonLabel>
          <IonButtons slot="end">
            <IonButton onClick={editSellModal.openModal}>
              <IonIcon slot="icon-only" icon={addCircle} />
            </IonButton>
          </IonButtons>
        </IonItem>
        <ListProductSell products={sell.products} />
      </IonContent>

      <Modal {...editSellModal}>
        <ProductSellForm
          onSaved={addProduct}
          closeModal={editSellModal.closeModal}
        />
      </Modal>
    </IonPage>
  );
};

export default EditSellPage;
