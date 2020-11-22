import React, {useEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ScrollView, StyleSheet} from 'react-native';
import {Avatar, Badge, Button, Colors, FAB, List} from 'react-native-paper';
import {Header} from '../../common';
import faker from 'faker';
import LINKS from '../../../utils/links';
import productRepository from '../../../database/productRepository';
import typeProductRepository from '../../../database/typeProductRepository';
import {rowsToArray} from '../../../utils/helper';

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Products = () => {
  //const route = useRoute();
  const navigation = useNavigation();

  const [products, setProducts] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      /**
       * Charge la liste des types produits avec le nombre d'article en stock
       */
      const loadData = async () => {
        try {
          const {rows} = await typeProductRepository.findAll();
          setProducts(rowsToArray(rows));
        } catch (error) {
          console.log(error);
        }
      };

      loadData();
    }, []),
  );

  return (
    <>
      <Header title="Liste des produits" goBack={navigation.goBack} />
      <ScrollView>
        {products.map((product, i) => {
          return (
            <List.Item
              key={product.id}
              title={product.name}
              description={`${product.nbProduct} models`}
              style={styles.item}
              onPress={() => {
                navigation.navigate(LINKS.products.show, {id: product.id});
              }}
              left={() => (
                <Avatar.Text
                  style={{
                    alignSelf: 'center',
                    //marginTop: 5,
                    backgroundColor: Colors.grey300,
                  }}
                  size={50}
                  label={product.name[0].toUpperCase()}
                />
              )}
              right={() => (
                <Badge
                  style={{
                    backgroundColor: Colors.grey300,
                    alignSelf: 'center',
                  }}
                  size={30}>
                  {product.stock}
                </Badge>
              )}
            />
          );
        })}
      </ScrollView>
      <Button
        style={styles.fab}
        icon="add"
        mode="contained"
        uppercase={false}
        color={Colors.green300}
        labelStyle={{letterSpacing: 0}}
        onPress={() => navigation.navigate(LINKS.products.edit)}>
        Ajouter un produit
      </Button>
    </>
  );
};

Products.defaultProps = {};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  item: {
    borderBottomWidth: 1,
  },
});

export default Products;
