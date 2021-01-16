import { IonItem, IonLabel, IonText } from "@ionic/react";
import React, { FC } from "react";
import { withFieldError } from "../../hoc";
import { FieldProps } from "../../types";

const TextField: FC<FieldProps> = ({ label, color, children }) => {
  return (
    <IonItem>
      <IonLabel position="fixed">
        <IonText color={color}>{label}</IonText>
      </IonLabel>
      {children}
    </IonItem>
  );
};

TextField.defaultProps = {};

export default withFieldError(TextField);
