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
import { barcodeOutline, checkmark, closeSharp } from "ionicons/icons";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { TextField } from "../../components/form";
import { productStore } from "../../database";
import { addProduct, setProduct } from "../../redux/reducers/products";
import { Product } from "../../types";
import { defaultImage } from "../../utils/images";

import "./CreateProduct.scss";

type CreateProductProps = {
  id?: string;
  closeModal: () => void;
};

const CreateProduct: React.FC<CreateProductProps> = ({ closeModal, id }) => {
  const [productState, setProductState] = useState<Product>({
    name: "",
    price: 0,
    stock: 0,
    codeBarre: "",
    description: "",
    icon: "",
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
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton onClick={closeModal}>
              <IonIcon slot="icon-only" icon={closeSharp} />
            </IonButton>
          </IonButtons>
          <IonTitle>Nouveau</IonTitle>
          <IonButtons slot="end">
            <IonButton disabled={!canSaved} onClick={saveProduct}>
              <IonIcon slot="icon-only" icon={checkmark} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent id="create-product">
        <div className="ion-padding account-image">
          <img src={defaultImage} alt="avatar" />
          <IonButton fill="clear" color="dark" size="small">
            Modifier image
          </IonButton>
        </div>
        <IonList>
          <TextField error={""} color="dark" label="Nom">
            <IonInput
              placeholder="Nom du produit"
              name="name"
              value={productState.name}
              onIonInput={onChange}
            />
          </TextField>
          <TextField error={""} color="dark" label="Code barre">
            <IonInput
              placeholder="Code barre du produit"
              name="codebarres"
              type="number"
              // value={productState.price || ""}
              onIonInput={onChange}
            />
            <IonButton>
              <IonIcon icon={barcodeOutline} /> scanner
            </IonButton>
          </TextField>
          <TextField error={""} color="dark" label="Description">
            <IonInput
              placeholder="Détail du produit"
              name="description"
              type="text"
              // value={productState.price || ""}
              onIonInput={onChange}
            />
          </TextField>
          <TextField color="dark" error={""} label="Prix">
            <IonInput
              placeholder="Prix unitaire"
              name="price"
              type="number"
              value={productState.price || ""}
              onIonInput={onChange}
            />
          </TextField>
          <TextField error={""} color="dark" label="Quantité">
            <IonInput
              placeholder="Quantité en stock"
              name="stock"
              type="number"
              // value={productState.price || ""}
              onIonInput={onChange}
            />
          </TextField>
        </IonList>
      </IonContent>
    </>
  );
};

export default CreateProduct;
