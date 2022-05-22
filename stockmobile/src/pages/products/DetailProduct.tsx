import React, { useCallback } from "react";

import {
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonTitle,
  IonHeader,
  IonBackButton,
  useIonViewDidEnter,
  IonList,
  IonButton,
  IonIcon,
  IonAlert,
  IonActionSheet,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import { productStore } from "../../database";
import { ProductItemModel } from "../../components/product";
import { addCircleOutline, pencilOutline, reloadOutline } from "ionicons/icons";
import { defaultImage } from "../../utils/images";
import { useModal } from "../../hooks";
import { addNumber } from "../../utils/functions";
import { selectProduct, setProduct } from "../../redux/reducers/products";
import { useDispatch, useSelector } from "react-redux";

const DetailProduct: React.FC<RouteComponentProps> = ({ match }) => {
  const product = useSelector(selectProduct);
  const stockModal = useModal();
  const actionModal = useModal();
  const dispatch = useDispatch();

  const loadProduct = useCallback(() => {
    const { id } = match.params as { [key: string]: string };
    productStore
      .findOne(id)
      .then((data) => dispatch(setProduct(data)))
      .catch((e) => {
        console.log(e);
      });
  }, [match, dispatch]);

  useIonViewDidEnter(() => {
    loadProduct();
  }, [loadProduct]);

  const increaseStock = (body: any) => {
    if (!product) {
      return;
    }
    const stock = body.stock as number;
    if (stock <= 0) {
      return alert("Mettre une valeur positive");
    }
    productStore
      .save({ ...product, stock: addNumber(product.stock, stock) })
      .then(loadProduct);
  };

  return (
    <IonPage id="product-page">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{product?.name}</IonTitle>
          {/* <IonButtons slot="end">
            <IonButton onClick={actionModal.openModal}>
              <IonIcon slot="icon-only" icon={ellipsisVertical} />
            </IonButton>
          </IonButtons> */}
        </IonToolbar>
      </IonHeader>

      <IonContent id="edit-product">
        <div className="ion-padding account-image">
          <img src={defaultImage} alt="avatar" />
        </div>
        <IonList>
          <ProductItemModel
            label="Nom de l'article"
            badge={product?.name || ""}
            right={
              <IonButton onClick={stockModal.openModal}>
                <IonIcon slot="icon-only" icon={pencilOutline} />
              </IonButton>
            }
          />
          <ProductItemModel
            label="Prix de vente"
            badge={`${product?.price || "0"} frs`}
            right={
              <IonButton onClick={stockModal.openModal}>
                <IonIcon slot="icon-only" icon={pencilOutline} />
              </IonButton>
            }
          />
          <ProductItemModel
            label="Quantité en stock"
            badge={`${product?.stock || 0} articles`}
            right={
              <IonButton onClick={stockModal.openModal}>
                <IonIcon slot="icon-only" icon={addCircleOutline} />
              </IonButton>
            }
          />
        </IonList>

        {/* {product?._id ? (
          <Modal {...editModal}>
            <EditProduct id={product?._id} closeModal={editModal.closeModal} />
          </Modal>
        ) : null} */}

        <IonAlert
          isOpen={stockModal.show}
          onDidDismiss={stockModal.closeModal}
          header="Augmenter la quantité"
          inputs={[
            {
              name: "stock",
              type: "number",
              min: 1,
              label: "Stock",
              placeholder: "Quantité à ajouter au stock",
              value: 1,
            },
          ]}
          buttons={[
            {
              text: "Annuler",
              role: "cancel",
              cssClass: "secondary",

              handler: () => {
                console.log("Confirm Cancel");
              },
            },
            {
              text: "Valider",
              handler: increaseStock,
            },
          ]}
        />

        <IonActionSheet
          isOpen={actionModal.show}
          onDidDismiss={actionModal.closeModal}
          // cssClass='my-custom-class'
          header={`${product?.stock || 0} articles en stock`}
          buttons={[
            {
              text: "Ajouter une production",
              icon: addCircleOutline,
              handler: () => {
                console.log("Play clicked");
              },
            },
            {
              text: "Historique des productions",
              icon: reloadOutline,
              handler: () => {
                console.log("Cancel clicked");
              },
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default DetailProduct;
