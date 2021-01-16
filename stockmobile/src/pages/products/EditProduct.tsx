import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeSharp, pencilSharp, trashSharp } from "ionicons/icons";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { TextField } from "../../components/form";
import { ProductItemModel } from "../../components/product";
import { productStore } from "../../database";
import productModelStore from "../../database/productModelStore";
import { addProduct, setProduct } from "../../redux/reducers/products";
import { ProductState, ProductModel } from "../../types";
import { defaultImage } from "../../utils/images";

import "./EditProduct.scss";

type EditProductProps = {
  id?: string;
  closeModal: () => void;
};

interface ElementState {
  productModel?: ProductModel;
  index?: number;
}

const EditProduct: React.FC<EditProductProps> = ({ closeModal, id }) => {
  const [productState, setProductState] = useState<ProductState>({
    name: "",
    productModels: [],
  });
  const [current, setCurrent] = useState<ElementState>({});
  const [toDelete, setToDelete] = useState<number | undefined>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) {
      return;
    }
    productStore
      .findWithModels(id)
      .then(setProductState)
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  const onChange = (e: CustomEvent<KeyboardEvent>) => {
    const { name, value } = e.detail.target as HTMLInputElement;
    setProductState((old) => ({ ...old, [name]: value }));
  };

  const canSaved = useMemo(() => {
    return (
      productState.name &&
      productState.name.trim() !== "" &&
      productState.productModels.length > 0
    );
  }, [productState]);

  const onAddProduct = () => {
    setCurrent({
      productModel: { name: "", price: 0, product: "", stock: 0 },
      index: undefined,
    });
  };

  const saveProduct = async () => {
    const { productModels, ...rest } = productState;
    const newProduct = await productStore.save(rest);
    const ids = productModels
      .filter((item) => (item._id ? true : false))
      .map((e) => e._id);

    await productModelStore
      .getDB()
      .remove({ _id: { $nin: ids }, product: newProduct._id }, { multi: true });

    const newModels = await productModelStore.saveAll(
      productModels.map((item) => ({ ...item, product: newProduct._id || "" }))
    );

    const data: ProductState = {
      ...newProduct,
      productModels: newModels,
    };
    if (productState._id) {
      dispatch(setProduct(data));
    } else {
      dispatch(addProduct(data));
    }
    closeModal();
  };

  const removeProductModel = () => {
    if (toDelete === undefined) {
      return;
    }
    setProductState((prev) => {
      return {
        ...prev,
        productModels: [
          ...prev.productModels.slice(0, toDelete),
          ...prev.productModels.slice(toDelete + 1),
        ],
      };
    });
  };

  const saveProductModel = (data: any) => {
    if (!current.productModel) {
      return;
    }

    setProductState((prev) => {
      const newProductModel = {
        ...current.productModel,
        name: data.name,
        price: data.price as number,
      } as ProductModel;

      let productModels = [];
      if (current.index === undefined) {
        productModels = [...prev.productModels, newProductModel];
      } else {
        const { index } = current;
        productModels = [
          ...prev.productModels.slice(0, index),
          newProductModel,
          ...prev.productModels.slice(index + 1),
        ];
      }

      return { ...prev, productModels };
    });

    setCurrent({});
  };

  const { productModel, index } = current;

  return (
    <>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={closeModal}>
              <IonIcon slot="icon-only" icon={closeSharp} />
            </IonButton>
          </IonButtons>
          <IonTitle>
            {productState._id ? "Modification" : "Nouveau produit"}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton disabled={!canSaved} onClick={saveProduct}>
              Enregistrer
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent id="edit-product">
        <div className="ion-padding account-image">
          <img src={defaultImage} alt="avatar" />
          <IonButton fill="clear" color="dark" size="small">
            Modifier image
          </IonButton>
        </div>
        <IonList>
          <TextField error={""} label="Nom">
            <IonInput
              placeholder="Donnez un nom à votre produit"
              name="name"
              value={productState.name}
              onIonInput={onChange}
            />
          </TextField>
          {productState.productModels.map((item, i) => (
            <ProductItemModel
              key={i}
              badge={`${item.price} frs`}
              label={item.name}
              right={() => (
                <>
                  <IonButton
                    size="small"
                    onClick={() =>
                      setCurrent({
                        productModel: item,
                        index: i,
                      })
                    }
                  >
                    <IonIcon slot="icon-only" icon={pencilSharp} />
                  </IonButton>
                  <IonButton size="small" onClick={() => setToDelete(i)}>
                    <IonIcon slot="icon-only" icon={trashSharp} />
                  </IonButton>
                </>
              )}
            />
          ))}
          <IonItem
            onClick={onAddProduct}
            lines="full"
            className="ion-text-center"
            button
          >
            <IonLabel>Ajouter un modèle</IonLabel>
          </IonItem>
        </IonList>
        {/* <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonButton
            style={{ textTransform: "none" }}
            shape="round"
            onClick={onAddProduct}
          >
            <IonIcon slot="start" icon={addCircleSharp} />
            Enregistrer
          </IonButton>
        </IonFab> */}
        <IonAlert
          isOpen={toDelete !== undefined}
          header="Supprimer ce modèle ?"
          onDidDismiss={() => setToDelete(undefined)}
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
              text: "Oui",
              handler: removeProductModel,
            },
          ]}
        />
        <IonAlert
          isOpen={!!productModel}
          onDidDismiss={() => setCurrent({})}
          header={index !== undefined ? "Modification" : "Ajout"}
          inputs={[
            {
              name: "name",
              type: "text",
              label: "Nom du modèle",
              placeholder: "Nom du modèle",
              value: productModel?.name,
            },
            {
              name: "price",
              type: "number",
              min: 0,
              label: "Prix de vente",
              placeholder: "Prix de vente",
              value: productModel?.price || "",
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
              handler: saveProductModel,
            },
          ]}
        />
      </IonContent>
    </>
  );
};

export default EditProduct;
