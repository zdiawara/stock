import React, { useEffect } from "react";

import {
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonTitle,
  IonMenuButton,
  IonHeader,
  IonList,
  IonFab,
  IonIcon,
  IonButton,
  IonFabButton,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from "@ionic/react";
import { add, createOutline, ellipsisVertical, trash } from "ionicons/icons";
import { useDispatch } from "react-redux";
import { useModal } from "../../../hooks";
import MouvementItem from "./MouvementItem";
import { useHistory } from "react-router";
import { LINKS } from "../../../utils/links";
import { TypeMouvement } from "../../../types/enums";

const ListMouvement: React.FC = () => {
  const modal = useModal();
  const history = useHistory();
  const products = [
    {
      _id: "es",
      numero: "00021",
      type: "Sortie",
      quatite: "20",
    },
  ];
  const dispatch = useDispatch();

  useEffect(() => {
    // productStore.findAll().then(setProducts).then(dispatch);
  }, [dispatch]);

  return (
    <IonPage id="product-page">
      <IonHeader color="default">
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Mouvements</IonTitle>

          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" icon={ellipsisVertical} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar mode="ios" color="primary">
          <IonSegment value="1">
            <IonSegmentButton value="1">
              <IonLabel>Tous</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="2">
              <IonLabel>Entrée</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="3">
              <IonLabel>Sortie</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {/* <IonSearchbar placeholder="Rechercher par numéro" /> */}
        <IonList>
          {products.map((product) => (
            <IonItemSliding key={product._id}>
              <MouvementItem mouvement={product} />

              <IonItemOptions side="end">
                <IonItemOption
                  color="primary"
                  onClick={() => console.log("unread clicked")}
                >
                  <IonIcon
                    style={{ fontSize: "1.5rem" }}
                    icon={createOutline}
                  />
                </IonItemOption>
                <IonItemOption
                  color="danger"
                  onClick={() => console.log("unread clicked")}
                >
                  <IonIcon style={{ fontSize: "1.5rem" }} icon={trash} />
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton
            onClick={() => {
              history.push(LINKS.mouvements.create(TypeMouvement.SORTIE));
            }}
          >
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
      {/* <Modal {...modal}>
        <CreateProduct closeModal={modal.closeModal} />
      </Modal> */}
    </IonPage>
  );
};

export default ListMouvement;
