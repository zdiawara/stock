import * as React from 'react';
import {Appbar} from 'react-native-paper';

const Header = ({scene, previous, navigation}) => {
  const {options} = scene.descriptor;

  return (
    <Appbar.Header style={{backgroundColor: 'transparent'}}>
      <Appbar.Content
        style={{backgroundColor: 'transparent'}}
        title={options.title || 'Title'}
      />
    </Appbar.Header>
  );
};

export default Header;
