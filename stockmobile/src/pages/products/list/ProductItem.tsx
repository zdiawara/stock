import React from "react";

import {
  IonItem,
  IonImg,
  IonLabel,
  IonIcon,
  IonAvatar,
  IonText,
  IonBadge,
} from "@ionic/react";
import { barcodeOutline } from "ionicons/icons";
import { defaultImage } from "../../../utils/images";
import { useHistory } from "react-router";
import { LINKS } from "../../../utils/links";
import { Product } from "../../../types";

type ProductItemProps = {
  _id: string;
  name: string;
  codeBarre: string;
  quantite: number;
  price?: string;
};

const ProductItem: React.FC<ProductItemProps> = ({
  _id,
  name,
  codeBarre,
  quantite,
  price,
}) => {
  const history = useHistory();

  return (
    <IonItem
      onClick={() => {
        history.push(LINKS.products.edit(_id || ""));
      }}
      lines="full"
      button={false}
    >
      <IonAvatar style={{ height: 60, width: 60 }} slot="start">
        <IonImg src={defaultImage} />
      </IonAvatar>
      <IonLabel>
        <h2 style={{ fontWeight: 600 }}>
          <IonText color="dark">{name}</IonText>
        </h2>

        <div
          style={{
            marginTop: 5,
            display: "flex",
            alignItems: "center",
          }}
        >
          <IonIcon
            style={{ fontSize: "1.2rem" }}
            icon={barcodeOutline}
            color="dark"
          />
          <IonText color="medium" style={{ fontSize: "0.9rem", marginLeft: 5 }}>
            {codeBarre}
          </IonText>
        </div>
      </IonLabel>
      <div style={{ textAlign: "right" }}>
        <IonBadge color="light">
          <span style={{ fontWeight: 600 }}>{quantite}</span>
        </IonBadge>
        {price && (
          <div style={{ fontSize: ".8rem", fontWeight: 600 }}>
            <IonText color="primary">{price}</IonText>
          </div>
        )}
      </div>
    </IonItem>
  );
};

export default ProductItem;
