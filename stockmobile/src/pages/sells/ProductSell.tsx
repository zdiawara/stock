import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeSharp } from "ionicons/icons";
import React from "react";
import { SelectField, TextField } from "../../components/form";

// import "./ProductSell.scss";

type ProductSellProps = {
  id?: string;
  closeModal: () => void;
  onUpdated: () => void;
};

const customPopoverOptions = {
  header: "Hair Color",
};

const ProductSell: React.FC<ProductSellProps> = ({ closeModal }) => {
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
            <IonButton color="primary" onClick={() => {}}>
              Valider
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent id="edit-product">
        <SelectField error={""} label="Produit">
          <IonSelect
            interfaceOptions={customPopoverOptions}
            // interface=""
            onIonChange={(e) => {
              //   setField("classe", e.detail.value);
            }}
            placeholder="Choisir un produit"
          >
            <IonSelectOption value={"ere"}>
              Piment - Grande boite
            </IonSelectOption>
            <IonSelectOption value={"code"}>Petite boite</IonSelectOption>
          </IonSelect>
        </SelectField>

        <TextField error={""} label="Quantité">
          <IonInput
            placeholder="Quantité vendu"
            name="name"
            value=""
            onIonInput={() => {}}
          />
        </TextField>
        <TextField error={""} label="Rémise">
          <IonInput
            placeholder="Rémise "
            name="name"
            value=""
            onIonInput={() => {}}
          />
        </TextField>
        <TextField error={""} label="Prix total">
          <IonInput
            placeholder="Prix total"
            name="name"
            value=""
            onIonInput={() => {}}
          />
        </TextField>
        <TextField error={""} label="Reste à payer">
          <IonInput
            placeholder="Reste à payer"
            name="name"
            value=""
            onIonInput={() => {}}
          />
        </TextField>
      </IonContent>
    </>
  );
};

export default ProductSell;
