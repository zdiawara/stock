import { IonItem, IonLabel, IonText } from "@ionic/react";
import React, { FC } from "react";
import { withFieldError } from "../../hoc";
import { FieldProps } from "../../types";

const TextField: FC<FieldProps> = ({ label, color, position, children }) => {
  return (
    <IonItem>
      <IonLabel position={position}>
        <IonText color={color}>{label}</IonText>
      </IonLabel>
      {children}
    </IonItem>
  );
};

TextField.defaultProps = {
  position: "fixed",
};

export default withFieldError(TextField);
