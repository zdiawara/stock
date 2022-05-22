import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Provider } from "react-redux";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/test.css";

import store from "./redux";
import { LINKS } from "./utils/links";
import { EditProduct, ListProduct } from "./pages/products";
import Menu from "./components/Menu";
import { Home } from "./pages/home";
import { CreateMouvement, ListMouvement } from "./pages/mouvements";

const App: React.FC = () => (
  <Provider store={store}>
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu menuEnabled={true} />
          <IonRouterOutlet id="main">
            <IonRouterOutlet>
              <Redirect exact path="/tabs" to="/tabs/home" />
              <Route
                path={LINKS.products.list}
                component={ListProduct}
                exact={true}
              />
              <Route
                path={LINKS.products.edit(":productId")}
                component={EditProduct}
                exact={true}
              />
              <Route
                path={LINKS.mouvements.list}
                component={ListMouvement}
                exact={true}
              />
              <Route
                path={LINKS.mouvements.create(":typeMouvement")}
                component={CreateMouvement}
                exact={true}
              />

              {/* <Route
          path="/tabs/resources"
          render={() => <ResourcePage />}
          exact={true}
        />

        <Route path="/tabs/sells" component={SellPage} exact={true} />
        <Route path="/tabs/sells/edit" component={EditSellPage} exact={true} />

        <Route
          path="/tabs/clients"
          render={() => <ClientPage />}
          exact={true}
        /> */}
              <Route path={LINKS.home.base} component={Home} exact={true} />
            </IonRouterOutlet>
          </IonRouterOutlet>

          <Route
            exact
            path="/"
            render={() => <Redirect to={LINKS.home.base} />}
          />
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  </Provider>
);

export default App;
