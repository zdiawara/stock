import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Button, Card, IconButton} from 'react-native-paper';
import {iconSvg} from '../../../utils/svg';
import {Svg} from '../../common';
//const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const Product = ({name}) => {
  return (
    <Card style={styles.container}>
      <Card.Title
        title={name}
        titleStyle={styles.titleStyle}
        style={{
          minHeight: 0,
          paddingTop: 3,
        }}
        right={(props) => <IconButton icon={'call'} onPress={() => {}} />}
      />
      <Card.Content>
        <Text style={{marginBottom: 5}}>Ouvert 24/24</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Svg style={{top: 6}} size={25} xml={iconSvg.assurance()} />
            <Text>Amo...</Text>
          </View>
          <Button
            labelStyle={{letterSpacing: 0}}
            icon="directions"
            onPress={() => {}}
            mode="contained"
            style={{
              borderRadius: 5,
              marginLeft: 'auto',
            }}
            contentStyle={{
              paddingVertical: 0,
              backgroundColor: 'red',
              height: 30,
            }}
            uppercase={false}>
            Se rendre
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

Product.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    marginBottom: 5,
  },
  titleStyle: {
    paddingVertical: 0,
    fontSize: 16,
  },
});

export default Product;
