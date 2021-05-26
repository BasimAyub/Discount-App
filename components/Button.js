import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

const MyButton = ({ btnStyle, txt, textStyle, onPress, disable }) => {
  const txtstyle = textStyle == undefined ? styles.defaultTxt : textStyle;
  const btnstyle = btnStyle == undefined ? styles.btn : btnStyle;

  return (
    <TouchableOpacity
      disabled={disable}
      onPress={onPress}
      style={[
        disable == true
          ? [
              btnstyle,
              {
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#B5B1B1',
              },
            ]
          : [btnstyle, { justifyContent: 'center', alignItems: 'center' }],
      ]}>
      <Text style={txtstyle}>{txt}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  btn: {
    borderRadius: 50,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultTxt: {
    color: 'white',
    fontSize: 15,
  },
});
export default MyButton;
