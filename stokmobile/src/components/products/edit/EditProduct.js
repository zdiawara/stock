import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView, Alert, StyleSheet} from 'react-native';
import {TextInput, Colors, Button} from 'react-native-paper';
import UUIDGenerator from 'react-native-uuid-generator';
import typeProductRepository from '../../../database/typeProductRepository';
import {Header} from '../../common';

import Products from './products';
import {addElement, updateElement} from '../../../utils/helper';
import LINKS from '../../../utils/links';

const defaultValue = {
  name: '',
  products: [],
};

const EditProduct = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Type de produit à créer.
  const [typeProduct, setTypeProduct] = useState(defaultValue);

  useEffect(() => {
    const load = async (id) => {
      if (!id) {
        return;
      }
      const data = await typeProductRepository.findOne(id);
      setTypeProduct({
        ...data,
        products: data.products.map((p) => ({...p, code: p.id})),
      });
    };
    const params = route.params || {};
    load(params.id);
  }, [route.params]);

  // Modifie l'attribut name
  const setTypeProductName = (name) => {
    setTypeProduct({...typeProduct, name});
  };

  // Verifie que le prix n'existe pas deja
  const isPriceValid = (product) =>
    !typeProduct.products.find((e) => e.price === product.price);

  /**
   * Ajoute un produit à la liste des produits
   * @param {*} product
   */
  const addProduct = async (product) => {
    if (isPriceValid(product)) {
      setTypeProduct({
        ...typeProduct,
        products: addElement(typeProduct.products, {
          ...product,
          code: await UUIDGenerator.getRandomUUID(),
        }),
      });
    } else {
      //alert('KO');
    }
  };

  /**
   * Modification d'un produit
   * @param {*} product
   */
  const updateProduct = (product) => {
    if (isPriceValid(product)) {
      const index = typeProduct.products.findIndex(
        (e) => e.code === product.code,
      );
      setTypeProduct({
        ...typeProduct,
        products: updateElement(typeProduct.products, product, index),
      });
    } else {
      //alert('KO');
    }
  };

  /**
   * Ajoute ou modifie un produit
   * @param {*} element
   */
  const addOrUpdateProduct = async (element) => {
    if (!element.code) {
      addProduct(element);
    } else {
      updateProduct(element);
    }
  };

  /**
   * Supprime un produit
   * @param {*} code
   */
  const deleteProduct = async (code) => {
    const index = typeProduct.products.findIndex((e) => e.code === code);
    setTypeProduct({
      ...typeProduct,
      products: [
        ...typeProduct.products.slice(0, index),
        ...typeProduct.products.slice(index + 1),
      ],
    });
  };

  /**
   * Enregistre les informations dans la base de données
   */
  const onSaveProduct = async () => {
    if (!typeProduct.name) {
      Alert.alert('Erreur', 'Donnez un nom au produit !');
      return;
    }

    if (!typeProduct.products.length) {
      Alert.alert('Erreur', 'Donnez au moins un prix !');
      return;
    }

    try {
      let id = typeProduct.id
        ? await typeProductRepository.update(typeProduct.id, typeProduct)
        : await typeProductRepository.insert(typeProduct);

      navigation.replace(LINKS.products.show, {id});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header
        title={typeProduct.id ? 'Modifier un produit' : 'Ajouter un produit'}
        goBack={navigation.goBack}
      />
      <ScrollView keyboardShouldPersistTaps="always">
        <TextInput
          label="Nom du produit"
          value={typeProduct.name}
          autoFocus
          placeholder="Ex : Sac à dos"
          onChangeText={setTypeProductName}
        />
        <Products
          saveProduct={addOrUpdateProduct}
          deleteProduct={deleteProduct}
          products={typeProduct.products}
        />
      </ScrollView>

      <Button
        mode="contained"
        icon="save"
        color={Colors.green300}
        uppercase={false}
        style={styles.fab}
        onPress={onSaveProduct}>
        Enregistrer
      </Button>
    </>
  );
};

EditProduct.defaultProps = {};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default EditProduct;
