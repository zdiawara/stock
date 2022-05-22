import { IonSelect, IonSelectOption } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { productStore } from "../../database";
import { Product } from "../../types";

type IProductItem = {
  name: string;
  _id: string;
};

type ProductPickerProps = {
  onSelect: (product: Product) => void;
};

const ProductPicker: React.FC<ProductPickerProps> = ({ onSelect }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productStore.findAll().then(setProducts);
  }, []);

  const _onSelect = (e: any) => {
    const item = products.find((p) => p._id === e.detail.value);
    if (item) {
      onSelect(item);
    }
  };

  return (
    <IonSelect onIonChange={_onSelect}>
      {products.map(({ _id, name }) => (
        <IonSelectOption key={_id} value={_id}>
          {name}
        </IonSelectOption>
      ))}
    </IonSelect>
  );
};

export default ProductPicker;
