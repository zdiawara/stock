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
import { selectSells, setSells } from "../../redux/reducers/sells";
import { useDispatch, useSelector } from "react-redux";
import sellStore from "../../database/sellStore";
import { toSellItem } from "../../utils/builder";
import productSellStore from "../../database/productSellStore";
import { sumNumbers } from "../../utils/functions";
import { ISellItem } from "../../types";

const SellsPage: React.FC = () => {
  const sells = useSelector(selectSells);
  const dispatch = useDispatch();

  useEffect(() => {
    sellStore.findAll().then((data) => {
      Promise.all(
        data.map(async (sell) => productSellStore.findBySell(sell._id || ""))
      ).then((data) => {
        dispatch(
          setSells(
            data.flatMap((item) => {
              console.log(item);

              return {
                _id: item[0]._id,
                total: sumNumbers(item.map((e) => e.total || 0)),
              } as ISellItem;
            })
          )
        );
      });
    });
  }, [dispatch]);

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
        {sells.map((item, i) => (
          <IonItem key={i} button detail lines="full">
            <IonLabel style={{ padding: "5px 0" }}>
              <h3>Vente {i + 1}</h3>
              <IonBadge style={{ marginTop: 10 }} color="light">
                {item.total} frs
              </IonBadge>
            </IonLabel>
          </IonItem>
        ))}

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
