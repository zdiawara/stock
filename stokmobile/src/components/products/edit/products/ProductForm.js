import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Dialog, Portal, TextInput} from 'react-native-paper';

const ProductForm = ({setVisible, onSave, setProduct, product}) => {
  const onChangePrice = (value) => {
    setProduct({...product, price: value});
  };

  const {price, id} = product;

  return (
    <Portal>
      <Dialog visible={true} onDismiss={() => setVisible(false)}>
        <Dialog.Title>{`${id ? 'Modifier' : 'Ajouter'} un prix`}</Dialog.Title>
        <Dialog.Content style={styles.dialogContent}>
          <TextInput
            keyboardType="numeric"
            label="Prix"
            autoFocus
            value={`${price}`}
            placeholder="ex : 1000"
            onChangeText={onChangePrice}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            disabled={price ? price.toString().trim() === '' : true}
            mode="contained"
            style={{elevation: 0}}
            onPress={onSave}>
            Valider
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

ProductForm.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  dialogContent: {
    paddingHorizontal: 2,
  },
});

export default ProductForm;
