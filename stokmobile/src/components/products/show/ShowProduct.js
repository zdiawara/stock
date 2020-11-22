import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {
  Appbar,
  Button,
  Colors,
  Dialog,
  Divider,
  IconButton,
  List,
  Menu,
  Portal,
  TextInput,
} from 'react-native-paper';
import getDB from '../../../database/db';
import productRepository from '../../../database/productRepository';
import typeProductRepository from '../../../database/typeProductRepository';
import {updateElement} from '../../../utils/helper';
import LINKS from '../../../utils/links';
import {Header} from '../../common';

const ProductItem = ({product, updateProduct}) => {
  const [visible, setVisible] = useState(false);
  const [stock, setStock] = useState('');
  const hideDialog = () => setVisible(false);

  const showDialog = () => {
    setStock('');
    setVisible(true);
  };

  const onAdd = async () => {
    try {
      const db = await getDB();
      const newProduct = {
        ...product,
        stock: product.stock + parseInt(stock, 10),
      };

      db.transaction(
        (tx) => {
          productRepository.update(newProduct, tx);
        },
        (e) => {
          console.error(e);
        },
        () => {
          updateProduct(newProduct);
        },
      );
    } catch (error) {
      console.log(error);
    }
    hideDialog();
  };

  const rightBtn = () => (
    <IconButton
      uppercase={false}
      contentStyle={{height: 30}}
      style={{
        backgroundColor: Colors.grey300,
        alignSelf: 'center',
      }}
      onPress={showDialog}
      icon="add"
      mode="contained"
    />
  );

  const title = `Model pour ${product.price} Frs`;

  return (
    <>
      <List.Item
        key={product.id}
        title={title}
        description={`Qté en stock : ${product.stock}`}
        style={styles.item}
        right={rightBtn}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content style={styles.dialogContent}>
            <TextInput
              keyboardType="numeric"
              label="Nouvelle quantité"
              autoFocus
              value={`${stock}`}
              placeholder="ex : 10"
              onChangeText={setStock}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              disabled={stock ? stock.toString().trim() === '' : true}
              mode="contained"
              style={{elevation: 0}}
              onPress={onAdd}>
              Ajouter
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const ShowProduct = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const [typeProduct, setTypeProduct] = useState({
    name: '',
    products: [],
  });

  useFocusEffect(
    React.useCallback(() => {
      const loadTypeProduct = async (id) => {
        try {
          setTypeProduct(await typeProductRepository.findOne(id));
        } catch (error) {
          console.log(error);
        }
      };
      loadTypeProduct(route.params.id);
    }, [route.params]),
  );

  const editProduct = () => {
    closeMenu();
    navigation.navigate(LINKS.products.edit, {id: typeProduct.id});
  };

  const updateProduct = (product) => {
    const index = typeProduct.products.findIndex((e) => e.id === product.id);
    setTypeProduct({
      ...typeProduct,
      products: updateElement(typeProduct.products, product, index),
    });
  };

  const {products} = typeProduct;

  return (
    <>
      <Header title={`${typeProduct.name}`} goBack={() => {}}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="more-vert" onPress={openMenu} />}>
          <Menu.Item
            icon="add"
            onPress={() => {}}
            title="Enr. une production"
          />
          <Menu.Item
            icon="history"
            onPress={() => {}}
            title="Hist. des productions"
          />
          <Divider />
          <Menu.Item
            icon="edit"
            onPress={editProduct}
            title="Modifier le produit"
          />
          <Menu.Item
            icon="delete"
            onPress={() => {}}
            title="Supprimer le produit"
          />
        </Menu>
      </Header>
      <ScrollView>
        {products.map((product, i) => {
          return (
            <ProductItem
              updateProduct={updateProduct}
              product={product}
              key={product.id}
            />
          );
        })}
      </ScrollView>

      <Button
        style={styles.fab}
        icon="add"
        mode="contained"
        color={Colors.green300}
        uppercase={false}
        labelStyle={{letterSpacing: 0}}>
        Enr. une production
      </Button>
    </>
  );
};

ShowProduct.defaultProps = {};

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
export default ShowProduct;
