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
} from "@ionic/react";
import { add, createOutline, ellipsisVertical, trash } from "ionicons/icons";
import Modal from "../../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../hooks";
import { productStore } from "../../../database";
import { selectProducts, setProducts } from "../../../redux/reducers/products";
import CreateProduct from "../CreateProduct";
import ProductItem from "./ProductItem";

const ListProduct: React.FC = () => {
  const modal = useModal();
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    productStore.findAll().then(setProducts).then(dispatch);
  }, [dispatch]);

  return (
    <IonPage id="product-page">
      <IonHeader color="default">
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Produits</IonTitle>

          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" icon={ellipsisVertical} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {/* <IonSearchbar /> */}
        <IonList>
          {products.map((product) => (
            <IonItemSliding key={product._id}>
              <ProductItem
                _id={product._id || ""}
                codeBarre={product.codeBarre}
                name={product.name}
                quantite={product.stock}
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

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={modal.openModal}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
      <Modal {...modal}>
        <CreateProduct closeModal={modal.closeModal} />
      </Modal>
    </IonPage>
  );
};

export default ListProduct;
