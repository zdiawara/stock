import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { checkmark } from "ionicons/icons";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useHistory } from "react-router";
import { TextField } from "../../../components/form";
import { productStore } from "../../../database";
import { selectProduct, setProduct } from "../../../redux/reducers/products";
import { defaultImage } from "../../../utils/images";

import "../EditProduct.scss";

const EditProduct: React.FC<RouteComponentProps> = ({ match }) => {
  const { productId } = match.params as Record<string, string>;
  const dispatch = useDispatch();
  const history = useHistory();
  const product = useSelector(selectProduct);
  // const [product, setProduct] = useState<Product>({
  //   name: "",
  //   price: 0,
  //   stock: 0,
  //   codeBarre: "",
  //   description: "",
  //   icon: "",
  // });

  useEffect(() => {
    productStore
      .findOne(productId)
      .then(setProduct)
      .then(dispatch)
      .catch((e) => {
        console.log(e);
      });
  }, [productId, dispatch]);

  const onChange = (e: CustomEvent<KeyboardEvent>) => {
    const { name, value } = e.detail.target as HTMLInputElement;
    if (product) {
      dispatch(setProduct({ ...product, [name]: value }));
    }
  };

  const canSaved = useMemo(() => {
    return product && product.name && product.name.trim() !== "";
  }, [product]);

  const saveProduct = async () => {
    if (!product) {
      return;
    }
    await productStore.save(product);
    dispatch(setProduct(await productStore.save(product)));
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Modification</IonTitle>
          <IonButtons slot="end">
            <IonButton disabled={!canSaved} onClick={saveProduct}>
              <IonIcon slot="icon-only" icon={checkmark} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent id="edit-product">
        {product && (
          <>
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
                  value={product.name}
                  onIonInput={onChange}
                />
              </TextField>
              <TextField error={""} color="dark" label="Code barre">
                <IonInput
                  placeholder="Code barre du produit"
                  name="codeBarre"
                  type="number"
                  value={product.codeBarre}
                  onIonInput={onChange}
                />
                <IonButtons>
                  <IonButton
                    style={{ textTransform: "none" }}
                    fill="solid"
                    color="dark"
                  >
                    Scanner
                  </IonButton>
                </IonButtons>
              </TextField>
              <TextField error={""} color="dark" label="Description">
                <IonInput
                  placeholder="Détail du produit"
                  name="description"
                  type="text"
                  value={product.description}
                  onIonInput={onChange}
                />
              </TextField>
              <TextField color="dark" error={""} label="Prix">
                <IonInput
                  placeholder="Prix unitaire"
                  name="price"
                  type="number"
                  value={product.price}
                  onIonInput={onChange}
                />
              </TextField>
              <TextField error={""} color="dark" label="Quantité">
                <IonText
                  style={{ marginLeft: 8, fontWeight: 600 }}
                  color="dark"
                >
                  {product.stock}
                </IonText>
                <IonButtons slot="end">
                  <IonButton
                    style={{ textTransform: "none" }}
                    color="dark"
                    fill="solid"
                    shape="round"
                  >
                    Entrée
                  </IonButton>
                  <IonButton
                    style={{ textTransform: "none" }}
                    color="dark"
                    fill="solid"
                    shape="round"
                  >
                    Sortie
                  </IonButton>
                </IonButtons>
              </TextField>
            </IonList>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default EditProduct;
