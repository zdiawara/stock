import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {List, Button, Colors} from 'react-native-paper';
import ProductForm from './ProductForm';
import ProductItem from './ProductItem';

const DEFAULT_PRODUCT = {
  code: null,
  name: '',
  price: '',
  stock: 0,
};

const Products = ({products, saveProduct, deleteProduct}) => {
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState(DEFAULT_PRODUCT);

  const onAdd = () => {
    setProduct(DEFAULT_PRODUCT);
    setVisible(true);
  };

  const editProduct = (code) => {
    const element = products.find((e) => e.code === code);
    setProduct(element);
    setVisible(true);
  };

  const onSave = () => {
    saveProduct(product);
    setVisible(false);
  };

  return (
    <List.Section>
      {products.map((item) => (
        <ProductItem
          key={item.code}
          editProduct={editProduct}
          deleteProduct={deleteProduct}
          product={item}
        />
      ))}
      {visible && product ? (
        <ProductForm
          product={product}
          setProduct={setProduct}
          setVisible={setVisible}
          onSave={onSave}
        />
      ) : null}
      <Button
        contentStyle={styles.btn}
        mode="contained"
        color={Colors.grey300}
        icon="add"
        onPress={onAdd}>
        Ajouter un prix
      </Button>
    </List.Section>
  );
};

Products.defaultProps = {
  products: [],
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    paddingLeft: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemContainer: {
    borderBottomWidth: 1,
  },
});

export default Products;
