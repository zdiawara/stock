import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Dialog, Portal, TextInput} from 'react-native-paper';

const PriceForm = ({setVisible, onSave, onChangePrice, current}) => {
  return (
    <Portal>
      <Dialog visible={true} onDismiss={() => setVisible(false)}>
        <Dialog.Title>{`${
          current.value ? 'Modifier' : 'Ajouter'
        } un prix`}</Dialog.Title>
        <Dialog.Content>
          <TextInput
            keyboardType="numeric"
            label="Prix"
            value={current.value}
            onChangeText={onChangePrice}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onSave}>Valider</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

PriceForm.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
});

export default PriceForm;
