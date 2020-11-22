import React from 'react';
import {Appbar} from 'react-native-paper';

const Header = ({title, children, goBack}) => {
  return (
    <Appbar.Header style={{backgroundColor: 'transparent'}}>
      {goBack && <Appbar.BackAction onPress={goBack} />}
      <Appbar.Content style={{backgroundColor: 'transparent'}} title={title} />
      {children}
    </Appbar.Header>
  );
};

export default Header;
