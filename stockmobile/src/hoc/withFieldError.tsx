import React, { FC, useMemo } from "react";
import { IonText } from "@ionic/react";
import { FieldProps } from "../types";

interface FieldErrorProps extends FieldProps {
  error?: string;
}

const withFieldError = (Wrapped: React.FC<FieldProps>) => {
  const HocCompoent: FC<FieldErrorProps> = ({ error, ...props }) => {
    const { fieldError, color } = useMemo(
      () =>
        error ? { fieldError: error, color: "danger" } : { color: "default" },
      [error]
    );

    return (
      <>
        <Wrapped color={color} {...props} />
        {fieldError ? (
          <IonText color={color} className="ion-padding-start">
            <small>{fieldError}</small>
          </IonText>
        ) : null}
      </>
    );
  };

  return HocCompoent;
};

export default withFieldError;
