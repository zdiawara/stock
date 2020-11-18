import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LINKS from '../utils/links';
import {EditProduct, ListProduct, ShowProduct} from '../components/products';
import Home from '../components/Home';

const Stack = createStackNavigator();

const SCREENS = [
  {
    name: LINKS.home,
    component: Home,
  },
  {
    name: LINKS.products.list,
    component: ListProduct,
  },
  {
    name: LINKS.products.edit,
    component: EditProduct,
  },
  {
    name: LINKS.products.show,
    component: ShowProduct,
  },
];

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName={LINKS.home}>
      {SCREENS.map((item) => (
        <Stack.Screen {...item} key={item.name} />
      ))}
    </Stack.Navigator>
  );
};

Navigation.defaultProps = {};

export default Navigation;
