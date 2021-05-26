import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  Pressable,
} from 'react-native';

import { Modal } from 'react-native-paper';
import Constants from 'expo-constants';
import MyBtn from './Button';
import HistoryScreen from './HistoryScreen';

const StartScreen = ({ navigation, route }) => {
  // Items List
  const [getItemsList, setItemsList] = useState([]);

  // original price input field
  const [getOPriceInputField, setOPriceInputField] = useState('');

  // discount percentage input field
  const [getDicountInputField, setDicountInputField] = useState('');

  // Discount Error message
  const [getWrongDiscountMsg, setWrongDiscountMsg] = useState('');

  // Amount saved is
  const [getSavedAmount, setSavedAmount] = useState('');

  // Final Price is
  const [getFinalPrice, setFinalPrice] = useState('');

  // Save Button disable/enable
  const [getSaveBtnDisableStatus, setSaveBtnDisableStatus] = useState(false);

  // Modal visibility status
  const [getModalVisibleStatus, setModalVisibleStatus] = useState(false);

  React.useEffect(() => {
    if (route.params?.listFromHistoryScreen) {
      setItemsList(route.params.listFromHistoryScreen);
    }
  }, [route.params?.listFromHistoryScreen]);

  // If both input fields are empty, save button disable
  useEffect(() => {
    if (getOPriceInputField == '' || getDicountInputField == '') {
      setSaveBtnDisableStatus(true);
    } else {
      setSaveBtnDisableStatus(false);
    }
    calculatePrice();
  }, [getOPriceInputField, getDicountInputField]);

  // When History button is  clicked
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MyBtn
          onPress={() => {
            navigation.navigate('History', { item: getItemsList });
          }}
          txt="History"
          btnStyle={styles.headerBtn}
          textStyle={styles.headerBtnText}
        />
      ),
    });
  });

  // When Save button is clicked
  const savehistory = () => {
    const myobj = {
      id: Math.random(),
      originalPrice: getOPriceInputField,
      Discount: getDicountInputField + ' %',
      finalPrice: getFinalPrice,
    };
    setItemsList([...getItemsList, myobj]);
    setModalVisibleStatus(true);
    Keyboard.dismiss();
  };

  // Calculating Price
  const calculatePrice = () => {
    if (
      getDicountInputField <= 100 &&
      getDicountInputField > 0 &&
      getOPriceInputField > 0
    ) {
      setWrongDiscountMsg('');
      setSaveBtnDisableStatus(false);

      // Price saved after discount
      let saved = (
        (getOPriceInputField * getDicountInputField) /
        100
      ).toFixed();

      // Final Price after discount
      let priceAfterDiscount = (getOPriceInputField - saved).toFixed(2);

      setSavedAmount(saved.toString());
      setFinalPrice(priceAfterDiscount.toString());
    } else if (getDicountInputField > 0) {
      setWrongDiscountMsg('Discount should be less than 100');
      setSaveBtnDisableStatus(true);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        keyboardType={'number-pad'}
        style={[styles.input]}
        placeholder="Enter Original Price here"
        onChangeText={(text) => {
          setOPriceInputField(text.replace(/[^0-9]/g, ''));
          setFinalPrice('');
          setSavedAmount('');
        }}
        value={getOPriceInputField}
      />
      <TextInput
        keyboardType={'number-pad'}
        style={styles.input}
        placeholder="Enter Discount here"
        onChangeText={(text) => {
          setDicountInputField(text.replace(/[^0-9]/g, ''));
          setFinalPrice('');
          setSavedAmount('');
        }}
        value={getDicountInputField}
      />
      <Text
        style={[
          getWrongDiscountMsg == '' ? { display: 'none' } : styles.fieldText,
        ]}>
        {getWrongDiscountMsg}
      </Text>

      <Text
        style={[getSavedAmount == '' ? { display: 'none' } : styles.fieldText]}>
        {'Amount Saved: ' + getSavedAmount}
      </Text>
      <Text
        style={[getSavedAmount == '' ? { display: 'none' } : styles.fieldText]}>
        {'Final Price: ' + getFinalPrice}
      </Text>

      <View
        style={{
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <MyBtn
          disable={getSaveBtnDisableStatus}
          onPress={savehistory}
          txt="Save"
          btnStyle={styles.headerBtn}
          textStyle={styles.headerBtnText}
        />
      </View>

      <Modal visible={getModalVisibleStatus}>
        <View style={styles.customView}>
          <View style={styles.customModal}>
            <Text>Saved in History</Text>

            <View>
              <MyBtn
                onPress={() => {
                  setModalVisibleStatus(false);
                  setSaveBtnDisableStatus(true);
                }}
                txt="OK"
                btnStyle={styles.headerBtn}
                textStyle={styles.headerBtnText}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

  customModal: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  customView: {
    justifyContent: 'center',
    marginTop: -60,
  },

  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    borderColor: '#15A085',
    borderRadius: 10,
    padding: 10,
  },

  fieldText: {
    fontSize: 20,
    color: '#15A085',
  },

  headerBtn: {
    margin: 8,
    backgroundColor: '#0D4744',
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 8,
  },

  headerBtnText: {
    fontSize: 14,
    color: 'white',
  },
});
export default StartScreen;
