import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native';
import Product from './Product';

const Products = () => {
  //const route = useRoute();
  const navigation = useNavigation();
  const data = [];
  useEffect(() => {
    navigation.setParams({title: 'Liste des cscom'});
  }, [navigation]);
  return (
    <ScrollView>
      {data.map((item, i) => (
        <Product key={i} {...item} />
      ))}
    </ScrollView>
  );
};

Products.defaultProps = {};

export default Products;
