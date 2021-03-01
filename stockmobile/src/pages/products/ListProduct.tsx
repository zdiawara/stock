import React, { useCallback, useEffect } from "react";

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
  IonIcon,
  IonButton,
} from "@ionic/react";
import { addCircleSharp } from "ionicons/icons";
import EditProduct from "./EditProduct";
import Modal from "../../components/Modal";
import { useModal } from "../../hooks";
import { productStore } from "../../database";
import { defaultImage } from "../../utils/images";
import { selectProducts, setProducts } from "../../redux/reducers/products";
import { useDispatch, useSelector } from "react-redux";

const ListProduct: React.FC = () => {
  const modal = useModal();

  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    productStore.findAll().then((data) => {
      dispatch(setProducts(data));
    });
  }, [dispatch]);

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

      <IonContent>
        <IonList>
          {products.map((product, i) => (
            <IonItem
              routerLink={`/tabs/products/${product._id}`}
              // button
              lines="full"
              detail
              key={i}
            >
              <IonThumbnail slot="start">
                <IonImg src={defaultImage} />
              </IonThumbnail>
              <IonLabel>
                <h2>{product.name}</h2>
                <p>{product.stockTotal} articles </p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonButton
            style={{ textTransform: "none" }}
            shape="round"
            onClick={modal.openModal}
          >
            <IonIcon slot="start" icon={addCircleSharp} />
            Ajouter produit
          </IonButton>
        </IonFab>
      </IonContent>
      <Modal {...modal}>
        <EditProduct closeModal={modal.closeModal} />
      </Modal>
    </IonPage>
  );
};

export default ListProduct;
