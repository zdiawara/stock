import { IonIcon } from "@ionic/react";
import { eyeOffOutline, eyeSharp } from "ionicons/icons";
import React, { useState } from "react";

const InputMask: React.FC = ({ children }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      {React.cloneElement(children as React.ReactElement<any>, {
        type: show ? "text" : "password",
      })}
      <IonIcon
        color={show ? "primary" : "default"}
        onClick={() => setShow((old) => !old)}
        icon={show ? eyeSharp : eyeOffOutline}
      />
    </>
  );
};

export default InputMask;
