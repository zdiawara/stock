import React from 'react';
import {StyleSheet, View} from 'react-native';
import {color} from 'react-native-reanimated';
import {CLIENTS, PRODUCTS, RESOURCES, SALES} from '../../../utils/icons';
import LINKS from '../../../utils/links';
import MenuItem from './MenuItem';

const productItem = {
  name: 'Produits',
  screen: LINKS.products.list,
  icon: PRODUCTS,
};

const resourceItem = {
  name: 'Ressources',
  screen: LINKS.resources.list,
  icon: RESOURCES,
};

const sellItem = {
  name: 'Ventes',
  screen: LINKS.sales.list,
  icon: SALES,
};

const clientItem = {
  name: 'Clients',
  screen: LINKS.clients.list,
  icon: CLIENTS,
};

const Line = ({children}) => {
  const size = React.Children.count(children);

  return (
    <View style={{flexDirection: 'row'}}>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          width: `${100 / size}%`,
        });
      })}
    </View>
  );
};

const Menu = () => {
  return (
    <>
      <Line>
        <MenuItem {...productItem} />
        <MenuItem {...resourceItem} />
      </Line>
      <MenuItem {...sellItem} />
      <MenuItem {...clientItem} />
    </>
  );
};

Menu.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: 'row',
  },
});

export default Menu;
