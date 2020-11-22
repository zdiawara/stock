import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {Card, Title, TouchableRipple} from 'react-native-paper';

const MenuItem = ({icon, name, screen, width}) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate(screen);
  };

  return (
    <View style={[styles.container, {width}]}>
      <Card style={styles.card}>
        <TouchableRipple style={{}} onPress={onPress}>
          <Card.Content style={styles.content}>
            <Image source={icon} />
            <Title style={styles.title}>{name}</Title>
          </Card.Content>
        </TouchableRipple>
      </Card>
    </View>
  );
};

MenuItem.defaultProps = {
  width: '100%',
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 3,
    paddingVertical: 5,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 10,
  },
  card: {
    flex: 1,
    paddingVertical: 0,
  },
});

export default MenuItem;
