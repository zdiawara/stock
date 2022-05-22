import { TypeMouvement } from "../types/enums";

const PRODUCTS = "/products";
const MOUVEMENTS = "/mouvements";
const DEPENSES = "/depenses";
const RAPPORTS = "/rapports";
const HOME = "/home";

export const LINKS = {
  home: {
    base: HOME,
  },
  products: {
    list: PRODUCTS,
    edit: (id: string) => `${PRODUCTS}/${id}`,
  },
  mouvements: {
    list: MOUVEMENTS,
    create: (typeMouvement: string) => `${MOUVEMENTS}/create/${typeMouvement}`,
  },
  depenses: {
    list: DEPENSES,
  },
  rapports: {
    list: RAPPORTS,
  },
};
