import React, { useCallback, useMemo, useState } from "react";

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
import { ProductModel } from "../../types";
import { ProductItemModel } from "../../components/product";
import {
  addCircleOutline,
  ellipsisVertical,
  pencilSharp,
  reloadOutline,
} from "ionicons/icons";
import { defaultImage } from "../../utils/images";
import EditProduct from "./EditProduct";
import Modal from "../../components/Modal";
import { useModal } from "../../hooks";
import productModelStore from "../../database/productModelStore";
import { addNumber } from "../../utils/functions";
import { selectProduct, setProduct } from "../../redux/reducers/products";
import { useDispatch, useSelector } from "react-redux";

const DetailProduct: React.FC<RouteComponentProps> = ({ match }) => {
  const product = useSelector(selectProduct);
  const [productModel, setProductModel] = useState<ProductModel | undefined>();
  const editModal = useModal();
  const actionModal = useModal();
  const dispatch = useDispatch();

  const loadProduct = useCallback(() => {
    const { id } = match.params as { [key: string]: string };
    productStore
      .findWithModels(id)
      .then((data) => dispatch(setProduct(data)))
      .catch((e) => {
        console.log(e);
      });
  }, [match, dispatch]);

  useIonViewDidEnter(() => {
    loadProduct();
  }, [loadProduct]);

  const increaseStock = (body: any) => {
    if (!productModel) {
      return;
    }
    const stock = body.stock as number;
    if (stock <= 0) {
      return alert("Mettre une valeur positive");
    }
    productModelStore
      .save({ ...productModel, stock: addNumber(productModel.stock, stock) })
      .then(() => {
        loadProduct();
      });
  };

  const stockTotal = useMemo(() => {
    return product?.productModels.reduce(
      (acc, prev) => (parseInt(`${prev.stock}`) + acc) as number,
      0
    );
  }, [product]);

  return (
    <IonPage id="product-page">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{product?.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={editModal.openModal}>
              <IonIcon slot="icon-only" icon={pencilSharp} />
            </IonButton>
            <IonButton onClick={actionModal.openModal}>
              <IonIcon slot="icon-only" icon={ellipsisVertical} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent id="edit-product">
        <div className="ion-padding account-image">
          <img src={defaultImage} alt="avatar" />
        </div>
        <IonList>
          {product?.productModels.map((item, i) => (
            <ProductItemModel
              key={item._id || i}
              label={item.name}
              badge={`${item.stock} articles`}
              right={() => (
                <IonButton onClick={() => setProductModel(item)}>
                  <IonIcon slot="icon-only" icon={addCircleOutline} />
                </IonButton>
              )}
            />
          ))}
        </IonList>

        {product?._id ? (
          <Modal {...editModal}>
            <EditProduct id={product?._id} closeModal={editModal.closeModal} />
          </Modal>
        ) : null}

        <IonAlert
          isOpen={!!productModel}
          onDidDismiss={() => setProductModel(undefined)}
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
          header={`${stockTotal} articles en stock`}
          buttons={[
            {
              text: "Modifier le produit",
              icon: pencilSharp,
              handler: editModal.openModal,
            },
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
