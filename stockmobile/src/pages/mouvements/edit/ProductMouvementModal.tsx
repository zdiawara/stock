import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  checkmarkSharp,
  close,
  informationCircleOutline,
  pricetagOutline,
} from "ionicons/icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  ProductPicker,
  SelectField,
  TextField,
} from "../../../components/form";
import { Product, ProductMouvement } from "../../../types";
import { TypeMouvement } from "../../../types/enums";

type ProductMouvementProps = {
  isValid: (productMouvement: ProductMouvement) => boolean;
  save: (productMouvement: ProductMouvement) => void;
  closeModal: () => void;
};

const ProductMouvementModal: React.FC<ProductMouvementProps> = ({
  isValid,
  save,
  closeModal,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const [productMouvement, setProductMouvement] = useState<ProductMouvement|undefined>({})
  const [product, setProduct] = useState<Product | undefined>();
  const [quantite, setQuantite] = useState<string>("");

  // const [product, setProduct] = useState<Product>({
  //   name: "",
  //   price: 0,
  //   stock: 0,
  //   codeBarre: "",
  //   description: "",
  //   icon: "",
  // });

  const onSave = () => {
    if (!product || !quantite) {
      return;
    }
    const productMouvement: ProductMouvement = {
      product,
      quantite: parseInt(quantite),
      typeMouvement: TypeMouvement.SORTIE,
    };
    if (isValid(productMouvement)) {
      save(productMouvement);
    }
  };

  return (
    <>
      <IonHeader translucent>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton onClick={closeModal}>
              <IonIcon icon={close} slot="icon-only" />
            </IonButton>
          </IonButtons>
          <IonTitle>Sortie</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onSave}>
              <IonIcon icon={checkmarkSharp} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonListHeader color="light">Information du produit</IonListHeader>
          <SelectField label="Produit">
            <ProductPicker onSelect={setProduct} />
          </SelectField>
          {product && (
            <>
              <IonItem>
                <IonIcon
                  icon={informationCircleOutline}
                  color="dark"
                  slot="start"
                />
                <IonLabel>Qté en stock</IonLabel>
                <IonBadge color="light">{product.stock}</IonBadge>
              </IonItem>
              <IonItem>
                <IonIcon icon={pricetagOutline} color="dark" slot="start" />
                <IonLabel>Prix de vente</IonLabel>
                <IonBadge color="dark">{product.price} frs</IonBadge>
              </IonItem>
            </>
          )}
        </IonList>
        <IonList>
          <IonListHeader color="light">Détail du mouvement</IonListHeader>

          <TextField label="Quantité" position="floating">
            <IonInput
              name="quantite"
              type="number"
              value={quantite}
              onIonChange={(e) => setQuantite(e.detail.value || "")}
              disabled={!product}
            />
          </TextField>
        </IonList>
      </IonContent>
    </>
  );
};

export default ProductMouvementModal;
