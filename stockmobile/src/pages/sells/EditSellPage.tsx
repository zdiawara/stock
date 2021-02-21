import React, { FC, TableHTMLAttributes, useEffect, useRef } from "react";

import {
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonTitle,
  IonHeader,
  IonItem,
  IonLabel,
  IonBadge,
  IonListHeader,
  IonBackButton,
  IonNote,
  IonGrid,
  IonCol,
  IonRow,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { useModal } from "../../hooks";
import ProductSell from "./ProductSell";
import Modal from "../../components/Modal";

import "./Table.scss";
import { addCircle } from "ionicons/icons";

type ItemProps = {
  label: string;
  value: string | number;
};
const Item: FC<ItemProps> = ({ label, value }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
      <IonBadge style={{ marginRight: 5 }} color="light">
        {label}
      </IonBadge>
      <IonNote>{value}</IonNote>
    </div>
  );
};
const EditSellPage: React.FC = () => {
  const editSellModal = useModal();
  const ref = useRef<HTMLTableElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    var table = ref.current.cloneNode(true);

    (table as HTMLElement).classList.add("clone");
    document.querySelector("#table-scroll")?.append(table);

    // var fixedColumn = table
    //   .cloneNode()
    //   .insertBefore()
    //   .insertBefore($table)
    //   .addClass("fixed-column");

    // $fixedColumn.find("th:not(:first-child),td:not(:first-child)").remove();

    // $fixedColumn.find("tr").each(function (i, elem) {
    //   $(this).height($table.find("tr:eq(" + i + ")").height());
    // });
  }, []);
  return (
    <IonPage id="edit-sell">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Nouvelle vente</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        {/* {/* <IonListHeader>Client</IoµnListHeader> */}
        <IonItem detail lines="full">
          <IonLabel>
            <h3>Client</h3>
            Traoré moussa
          </IonLabel>

          {/* <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" icon={addCircle} />
            </IonButton>
          </IonButtons> */}
        </IonItem>

        {/* <IonListHeader>Produits vendus</IonListHeader> */}

        <IonItem lines="none">
          <IonLabel>Articles achetés</IonLabel>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" icon={addCircle} />
            </IonButton>
          </IonButtons>
        </IonItem>

        <div id="table-scroll" className="table-scroll">
          <div className="table-wrap">
            <table ref={ref} className="main-table">
              <thead>
                <tr>
                  <th
                    className="fixed-side"
                    style={{ fontWeight: "bold" }}
                    scope="col"
                  >
                    Nom produit
                  </th>
                  <th scope="col">Quantité</th>
                  <th scope="col">Remise</th>
                  <th scope="col">Prix total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th
                    style={{
                      maxWidth: "300px",

                      // display: "flex",
                      // flexWrap: "wrap",
                    }}
                    className="fixed-side ion-text-wrap"
                  >
                    Curry en boite rouge vert
                  </th>
                  <td>3</td>
                  <td>0</td>
                  <td>2 500 frs</td>
                </tr>
                <tr>
                  <th className="fixed-side">Piment rouge</th>
                  <td>3</td>
                  <td>0</td>
                  <td>2 500 frs</td>
                </tr>
              </tbody>
              {/* <tfoot>
                <tr>
                  <th className="fixed-side">&nbsp;</th>
                  <td>Footer 2</td>
                  <td>Footer 3</td>
                  <td>Footer 4</td>
                </tr>
              </tfoot> */}
            </table>
          </div>
        </div>

        {/* <IonItem lines="none" detail>
          <IonLabel>
            <h3>Curry en poudre blanche</h3>
            <IonGrid>
              <IonRow>
                <IonCol size="4">
                  <Item label="Quantite" value="2" />
                </IonCol>
                <IonCol size="4">
                  <Item label="Pv" value="2 500 frs" />
                </IonCol>
                <IonCol size="4">
                  <Item label="Rap" value="500 frs" />
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonLabel>
        </IonItem> */}

        {/* <IonItem
          button
          color="light"
          lines="none"
          onClick={editSellModal.openModal}
        >
          Ajouter un produit
        </IonItem> */}
      </IonContent>

      <Modal {...editSellModal}>
        <ProductSell
          onUpdated={() => {}}
          closeModal={editSellModal.closeModal}
        />
      </Modal>
    </IonPage>
  );
};

export default EditSellPage;
