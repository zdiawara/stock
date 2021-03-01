import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeSharp } from "ionicons/icons";
import React, { useCallback, useEffect, useState } from "react";
import { Product, IProductSellState } from "../../types";
import { productNumber } from "../../utils/functions";
import { ProductPicker, SelectField, TextField } from "../form";

type ProductSellFormProps = {
  id?: string;
  closeModal: () => void;
  onSaved: (data: IProductSellState) => void;
};

const INITIAL = {
  quantity: 1,
};
const ProductSellForm: React.FC<ProductSellFormProps> = ({
  closeModal,
  onSaved,
}) => {
  const [productSell, setProductSell] = useState<IProductSellState>({
    _id: undefined,
    discount: 0,
    price: 0,
    total: 0,
    product: undefined,
    quantity: INITIAL.quantity,
  });

  const setField = useCallback((field: string, value: any) => {
    setProductSell((old) => ({ ...old, [field]: value }));
  }, []);

  useEffect(() => {
    setProductSell((prev) => ({
      ...prev,
      total: productNumber(prev.quantity, prev.price) - prev.discount,
    }));
  }, [productSell.product, productSell.quantity, productSell.discount]);

  const onChange = (e: CustomEvent<KeyboardEvent>) => {
    const { name, value } = e.detail.target as HTMLInputElement;
    setField(name, value);
  };

  const changeProduct = (product: Product) => {
    setProductSell((prev) => ({
      ...prev,
      product: {
        _id: product._id || "",
        name: product.name,
      },
      price: product.price,
    }));
  };

  const changeQuantity = (e: any) => {
    const { value } = e.target as HTMLInputElement;
    const quantity = value as any;
    setProductSell((prev) => ({ ...prev, quantity }));
  };

  const _onSaved = () => {
    onSaved(productSell);
    closeModal();
  };

  const { discount, total, price, quantity } = productSell;

  return (
    <>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={closeModal}>
              <IonIcon slot="icon-only" icon={closeSharp} />
            </IonButton>
          </IonButtons>
          <IonTitle>Ajout de produit</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={_onSaved}>Valider</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent id="edit-product">
        <SelectField error={""} label="Produit">
          <ProductPicker onSelect={changeProduct} />
        </SelectField>

        <IonItem lines="full">
          <IonLabel position="stacked">
            <IonText>Prix unitaire (frs)</IonText>
          </IonLabel>
          {/* {new Number(1000000).toLocaleString("fr-FR")} */}
          {price}
        </IonItem>

        <TextField label="Qté vendue">
          <IonInput
            // placeholder="Quantité vendu"
            name="quantity"
            type="number"
            value={quantity}
            onIonChange={changeQuantity}
            disabled={!productSell.product}
          />
        </TextField>
        <TextField label="Rémise">
          <IonInput
            placeholder="Rémise"
            name="discount"
            type="number"
            value={discount}
            onIonInput={onChange}
            disabled={!productSell.product}
          />
        </TextField>
        <TextField label="Prix total (frs)">
          <IonInput
            placeholder=""
            name="total"
            value={total}
            type="number"
            onIonInput={onChange}
            disabled={!productSell.product}
          />
        </TextField>
      </IonContent>
    </>
  );
};

export default ProductSellForm;
