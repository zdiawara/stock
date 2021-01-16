import { IonItem, IonLabel, IonText } from "@ionic/react";
import React, { FC } from "react";
import { withFieldError } from "../../hoc";
import { FieldProps } from "../../types";

const SelectField: FC<FieldProps> = ({ label, color, children }) => {
  return (
    <IonItem>
      <IonLabel position="floating">
        <IonText color={color}>{label}</IonText>
      </IonLabel>
      {children}
    </IonItem>
  );
};

SelectField.defaultProps = {};

export default withFieldError(SelectField);
