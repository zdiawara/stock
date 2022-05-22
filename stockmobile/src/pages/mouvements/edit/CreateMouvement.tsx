import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  add,
  arrowDownOutline,
  barcodeOutline,
  checkmarkSharp,
  chevronDown,
  createOutline,
  search,
  trash,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps, useHistory } from "react-router";
import { TextField } from "../../../components/form";
import Modal from "../../../components/Modal";
import { useModal } from "../../../hooks";
import { Product, ProductMouvement } from "../../../types";
import { TypeMouvement } from "../../../types/enums";
import ProductItem from "../../products/list/ProductItem";
import ProductMouvementModal from "./ProductMouvementModal";

const CreateMouvement: React.FC<RouteComponentProps> = ({ match }) => {
  const { productId } = match.params as Record<string, string>;
  const dispatch = useDispatch();
  const history = useHistory();
  const editModal = useModal();
  const [productsMouvements, setProductsMouvements] = useState<
    ProductMouvement[]
  >([]);

  // const [product, setProduct] = useState<Product>({
  //   name: "",
  //   price: 0,
  //   stock: 0,
  //   codeBarre: "",
  //   description: "",
  //   icon: "",
  // });

  useEffect(() => {}, [productId, dispatch]);

  const isMouvementValid = (productMouvement: ProductMouvement) => {
    return true;
  };

  const saveProductMouvement = (productMouvement: ProductMouvement) => {
    setProductsMouvements((prev) => {
      return [...prev, productMouvement];
    });
    editModal.closeModal();
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Sortie</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" icon={checkmarkSharp} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonListHeader color="light" style={{ display: "flex" }}>
            Info sur le mouvement
          </IonListHeader>
          <IonItem detail lines="full">
            <IonLabel>Clients</IonLabel>
          </IonItem>

          <IonItem lines="full">
            <IonLabel position="floating">Date</IonLabel>
            <IonDatetime
              displayFormat="DD/MM/YYYY"
              min="1989-06-04"
              max="2004-08-23"
              value="2020"
            />
          </IonItem>
        </IonList>
        <IonList>
          <IonListHeader color="light">Liste des produits</IonListHeader>
          {productsMouvements.map(({ product, quantite }) => (
            <IonItemSliding key={product._id || ""}>
              <ProductItem
                _id={product._id || ""}
                codeBarre={product.codeBarre}
                name={product.name}
                quantite={quantite}
                price={`${quantite * product.price} frs`}
              />
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
        {!!productsMouvements.length && (
          <IonList>
            <IonListHeader color="light">Info supplémentaire</IonListHeader>
            <IonItem>
              <IonLabel position="floating">
                <IonText>Rémise</IonText>
              </IonLabel>
              <IonInput
                type="number"
                name="discount"
                value={""}
                onIonInput={() => {}}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">
                <IonText>Reste à payer</IonText>
              </IonLabel>
              <IonInput
                type="number"
                name="reste"
                value={""}
                onIonInput={() => {}}
              />
            </IonItem>
          </IonList>
        )}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <div style={{ display: "flex" }}>
            <IonFabButton color="dark">
              <IonIcon icon={barcodeOutline} />
            </IonFabButton>
            <IonFabButton
              style={{ marginLeft: 10 }}
              onClick={editModal.openModal}
            >
              <IonIcon icon={add} />
            </IonFabButton>
          </div>
        </IonFab>

        {editModal.show && (
          <Modal {...editModal}>
            <ProductMouvementModal
              isValid={isMouvementValid}
              save={saveProductMouvement}
              closeModal={editModal.closeModal}
            />
          </Modal>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CreateMouvement;
