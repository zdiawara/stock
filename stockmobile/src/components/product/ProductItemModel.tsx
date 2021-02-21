import React from "react";

import { IonItem, IonLabel, IonBadge, IonButtons } from "@ionic/react";

type ProductItem = {
  label: string;
  badge: string;
  right?: React.ReactNode;
};
const ProductItemModel: React.FC<ProductItem> = ({ label, badge, right }) => {
  return (
    <IonItem lines="full">
      <IonLabel style={{ padding: "5px 0" }}>
        <h3>{label}</h3>
        <IonBadge style={{ marginTop: 10 }} color="light">
          {badge}
        </IonBadge>
      </IonLabel>
      {right ? <IonButtons slot="end">{right}</IonButtons> : null}
    </IonItem>
  );
};

export default ProductItemModel;
