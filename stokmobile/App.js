import React from 'react';
import {StatusBar} from 'react-native';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Navigation from './src/navigation';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const App = () => {
  return (
    <PaperProvider
      theme={theme}
      settings={{
        icon: (props) => <MaterialIcons {...props} />,
      }}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <Navigation />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
