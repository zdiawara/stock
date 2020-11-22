import React from 'react';
import {Appbar, Menu as MenuPaper} from 'react-native-paper';

const Menu = ({children}) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <MenuPaper
      visible={visible}
      onDismiss={closeMenu}
      anchor={<Appbar.Action icon="more-vert" onPress={openMenu} />}>
      {children}
    </MenuPaper>
  );
};

Menu.defaultProps = {
  options: [],
};

export default Menu;
