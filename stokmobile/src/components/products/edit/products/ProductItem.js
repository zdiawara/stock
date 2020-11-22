import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Button,
  Dialog,
  IconButton,
  List,
  Paragraph,
  Portal,
  Colors,
} from 'react-native-paper';

const ProductItem = ({product, editProduct, deleteProduct}) => {
  const [visible, setVisible] = useState(false);

  const hideDialog = () => setVisible(false);

  const showDialog = () => setVisible(true);

  const onEdit = () => {
    editProduct(product.code);
  };

  const onDelete = () => {
    deleteProduct(product.code);
  };

  return (
    <>
      <List.Item
        style={styles.container}
        title={`${product.price} frs`}
        right={() => (
          <>
            <IconButton onPress={onEdit} icon="edit" />
            <IconButton onPress={showDialog} icon="delete" />
          </>
        )}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Paragraph>Voulez-vous vraiment supprimer ce prix ?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Non</Button>
            <Button
              style={{elevation: 0}}
              color={Colors.red300}
              //mode="contained"
              onPress={onDelete}>
              Oui
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

ProductItem.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
});

export default ProductItem;
