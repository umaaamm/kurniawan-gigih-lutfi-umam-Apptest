import { colors } from '../../assets/colors';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

export default function TextComponent({
  fontType = 'regular',
  color = colors.black,
  text = '',
  style = {},
  isTitle,
  fontSize = 29,
  numberOfLines = 0,
}) {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[styles.textStyle(isTitle, fontType,fontSize), {...style, color}]}>
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
    textStyle:(isTitle, fontType,fontSize) => ({
        fontSize: isTitle ? fontSize : 17,
        fontFamily: fontType == 'regular' ? 'Lato-Regular' : 'Lato-Bold',
      })
});

TextComponent.propTypes = {
    fontType: PropTypes.string,
    color: PropTypes.string,
    text: PropTypes.string,
    style:  PropTypes.any,
    isTitle: PropTypes.bool,
    numberOfLines: PropTypes.number,
    fontSize: PropTypes.number,
  };