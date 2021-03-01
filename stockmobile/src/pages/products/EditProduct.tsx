import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonList,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeSharp } from "ionicons/icons";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { TextField } from "../../components/form";
import { productStore } from "../../database";
import { addProduct, setProduct } from "../../redux/reducers/products";
import { Product } from "../../types";
import { defaultImage } from "../../utils/images";

import "./EditProduct.scss";

type EditProductProps = {
  id?: string;
  closeModal: () => void;
};

const EditProduct: React.FC<EditProductProps> = ({ closeModal, id }) => {
  const [productState, setProductState] = useState<Product>({
    name: "",
    price: 0,
    stock: 0,
  });
  // const [current, setCurrent] = useState<ElementState>({});
  // const [toDelete, setToDelete] = useState<number | undefined>();
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
    return productState.name && productState.name.trim() !== "";
  }, [productState]);

  const saveProduct = async () => {
    const newProduct = await productStore.save(productState);

    if (productState._id) {
      dispatch(setProduct(newProduct));
    } else {
      dispatch(addProduct(newProduct));
    }
    closeModal();
  };

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
          <TextField error={""} label="Prix">
            <IonInput
              placeholder="Prix de vente unitaire"
              name="price"
              type="number"
              value={productState.price || ""}
              onIonInput={onChange}
            />
          </TextField>
        </IonList>
      </IonContent>
    </>
  );
};

export default EditProduct;
