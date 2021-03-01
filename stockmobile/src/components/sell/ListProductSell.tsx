import React, { useEffect, useRef } from "react";
import { IProductSellState } from "../../types";

type ListProductSellProps = {
  products: IProductSellState[];
};

const ListProductSell: React.FC<ListProductSellProps> = ({ products }) => {
  const ref = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    var table = ref.current.cloneNode(true);
    (table as HTMLElement).classList.add("clone");
    document.querySelector("#table-scroll")?.append(table);
  }, [products]);

  if (!products.length) {
    return null;
  }
  return (
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
            {products.map((item, i) => (
              <tr key={i}>
                <th
                  style={{ maxWidth: "300px" }}
                  className="fixed-side ion-text-wrap"
                >
                  {item.product?.name}
                </th>
                <td>{item.quantity}</td>
                <td>{item.discount}</td>
                <td>{item.total} frs</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProductSell;
