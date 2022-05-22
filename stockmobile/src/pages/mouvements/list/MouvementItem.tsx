import React from "react";

import { IonItem, IonLabel, IonText, IonBadge } from "@ionic/react";
import { useHistory } from "react-router";

type MouvementItemProps = {
  mouvement: any;
};

const MouvementItem: React.FC<MouvementItemProps> = ({ mouvement }) => {
  const history = useHistory();

  return (
    <IonItem
      onClick={() => {
        // history.push(LINKS.products.edit(mouvement._id || ""));
      }}
      lines="full"
      button={false}
    >
      <IonLabel>
        <h2 style={{ fontWeight: 600 }}>
          <IonText color="dark">N°000023</IonText>
        </h2>
        <div
          style={{
            marginTop: 5,
            display: "flex",
            alignItems: "center",
          }}
        >
          <IonBadge color="primary">Sortie</IonBadge>
          <IonText style={{ marginLeft: 5, fontSize: ".9rem" }} color="medium">
            14/12/2021
          </IonText>
        </div>
      </IonLabel>
      <div style={{ fontWeight: 600 }}>
        <IonBadge color="light">{20}</IonBadge>
      </div>
    </IonItem>
  );
};

export default MouvementItem;
