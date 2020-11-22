import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SQLite from 'react-native-sqlite-storage';
import Navigation from './src/navigation';
import DB from './src/database/db';
import productRepository from './src/database/productRepository';
import typeProductRepository from './src/database/typeProductRepository';

const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
    background: '#fff',
  },
};

const App = () => {
  useEffect(() => {
    const load = async () => {
      try {
        //console.log('pl');
        //const {rows} = await typeProductRepository.findAll();
        //const d = await typeProductRepository.create();
        //console.log(rows.item(6));
      } catch (error) {
        console.log(error);
      }
    };

    load();
    /*try {
      DB.executeSql(
        'select * from products',
        [],
        (_, {rows}) => {
          console.log(rows);
          console.log(_);
        },
        (e) => {
          console.log(e);
        },
      );
    } catch (error) {
      console.log(error);
    }*/
  }, []);
  return (
    <PaperProvider
      theme={theme}
      settings={{
        icon: (props) => <MaterialIcons {...props} />,
      }}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <Navigation />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
