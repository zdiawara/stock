import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {List, Button, Title, Colors} from 'react-native-paper';
import PriceForm from './PriceForm';
import PriceItem from './PriceItem';

const ELEMENT = {
  value: '',
  id: null,
};

const Prices = ({prices, savePrice}) => {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(ELEMENT);

  const onAdd = () => {
    setCurrent(ELEMENT);
    setVisible(true);
  };

  const onEdit = (id) => {
    const element = prices.find((e) => e.id === id);
    if (element) {
      setCurrent(element);
      setVisible(true);
    } else {
      // Error
    }
  };

  const onDelete = (i) => {
    setCurrent(prices[i]);
    setVisible(true);
  };

  const onChangePrice = (value) => {
    setCurrent({...current, value});
  };

  const onSave = () => {
    savePrice(current);
    setVisible(false);
  };

  return (
    <List.Section>
      {prices.map((item) => (
        <PriceItem
          key={item.id}
          onEdit={onEdit}
          onDelete={onDelete}
          {...item}
        />
      ))}
      {visible ? (
        <PriceForm
          current={current}
          onChangePrice={onChangePrice}
          setVisible={setVisible}
          onSave={onSave}
        />
      ) : null}
      <Button
        contentStyle={styles.btn}
        mode="contained"
        color={Colors.grey300}
        icon="add"
        onPress={onAdd}
        uppercase={false}>
        Ajouter un prix
      </Button>
    </List.Section>
  );
};

Prices.defaultProps = {
  prices: [],
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
  btn: {
    height: 30,
  },
});

export default Prices;
