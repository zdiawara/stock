import React from 'react';
import {StyleSheet, View} from 'react-native';

import {SvgCss} from 'react-native-svg';

const Svg = ({xml, height, width, size, style}) => {
  return (
    <SvgCss
      xml={xml}
      style={style}
      height={size || height}
      width={size || width}
    />
  );
};

Svg.defaultProps = {
  height: 35,
  width: 35,
  style: {},
};

const styles = StyleSheet.create({});
export default Svg;
