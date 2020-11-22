import React from 'react';
import {StyleSheet} from 'react-native';
import {IconButton, List} from 'react-native-paper';

const PriceItem = ({value, id, onEdit}) => {
  const editPrice = () => {
    onEdit(id);
  };

  return (
    <List.Item
      style={styles.container}
      title={`${value} frs`}
      right={() => (
        <>
          <IconButton onPress={editPrice} icon="edit" />
          <IconButton onPress={() => {}} icon="delete" />
        </>
      )}
    />
  );
};

PriceItem.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
});

export default PriceItem;
