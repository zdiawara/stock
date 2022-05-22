import {
  barChart,
  business,
  card,
  cube,
  hammer,
  helpCircle,
  home,
} from "ionicons/icons";
import { LINKS } from "./links";

export const MENU = {
  home: { title: "Menu principal", path: LINKS.home.base, icon: home },
  products: { title: "Produits", path: LINKS.products.list, icon: cube },
  mouvements: {
    title: "Mouvements",
    path: LINKS.mouvements.list,
    icon: business,
  },
  depenses: { title: "Depenses", path: LINKS.depenses.list, icon: card },
  rapports: { title: "Rapports", path: LINKS.rapports.list, icon: barChart },
  support: { title: "Support", path: "/support", icon: helpCircle },
  tutoriel: { title: "Tutoriel", path: "/logout", icon: hammer },
};
