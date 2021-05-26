import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Modal } from 'react-native-paper';
import { DataTable } from 'react-native-paper';
import MyBtn from './Button';

const HistoryScreen = ({ route, navigation }) => {
  let { item } = route.params;

  // Modal visibility status
  const [getModalVisibleStatus, setgetModalVisibleStatus] = useState(false);

  // Clear Button disable/enable
  const [getBtnDisableStatus, setBtnDisableStatus] = useState(false);

  // Back button and clear history button
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MyBtn
          disable={getBtnDisableStatus}
          onPress={() => setgetModalVisibleStatus(true)}
          txt="Clear"
          btnStyle={styles.headerBtn}
          textStyle={styles.headerBtnText}
        />
      ),
      headerLeft: () => (
        <MyBtn
          onPress={() =>
            navigation.navigate('StartScreen', { listFromHistoryScreen: item })
          }
          txt="Back"
          btnStyle={styles.headerBtn}
          textStyle={styles.headerBtnText}
        />
      ),
    });
  });

  // Disable clear button if list is empty
  useEffect(() => {
    if (item.length != 0) {
      setBtnDisableStatus(false);
    } else {
      setBtnDisableStatus(true);
    }
  }, [item]);

  // When individual delete button is pressed
  const modifyHistory = (id) => {
    let newhistory = item.filter((item) => item.id != id);
    if (newhistory == undefined || newhistory == {}) {
      newhistory = [];
    }
    navigation.setParams({
      item: newhistory,
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 10, left: 245, marginBottom: 10 }}></View>
      <ScrollView>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Original Price -</DataTable.Title>
            <DataTable.Title>Dicount =</DataTable.Title>
            <DataTable.Title>Final Price</DataTable.Title>
          </DataTable.Header>
          {showTable()}
        </DataTable>
      </ScrollView>
      <Modal visible={getModalVisibleStatus}>
        <View style={styles.customView}>
          <View style={styles.customModal}>
            <Text>Are you sure to clear History?</Text>

            <View style={{ flexDirection: 'row' }}>
              <MyBtn
                onPress={() => {
                  navigation.setParams({
                    item: [],
                  });
                  setgetModalVisibleStatus(false);
                }}
                txt="Yes"
                btnStyle={styles.headerBtn}
                textStyle={styles.headerBtnText}
              />
              <MyBtn
                onPress={() => {
                  setgetModalVisibleStatus(false);
                }}
                txt="No"
                btnStyle={styles.headerBtn}
                textStyle={styles.headerBtnText}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
  function showTable() {
    if (item.length != 0) {
      return item.map((item) => {
        return (
          <DataTable.Row>
            <DataTable.Cell style={styles.content}>
              {item.originalPrice}
            </DataTable.Cell>
            <DataTable.Cell style={[styles.content, { paddingLeft: 25 }]}>
              -
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 3, paddingLeft: 15 }}>
              {item.Discount}
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 2 }}>=</DataTable.Cell>
            <DataTable.Cell style={{ flex: 3 }}>
              {item.finalPrice}
            </DataTable.Cell>
            <DataTable.Cell style={styles.content}>
              <TouchableOpacity onPress={() => modifyHistory(item.id)}>
                <Text style={{ color: '#15A085' }}>X</Text>
              </TouchableOpacity>
            </DataTable.Cell>
          </DataTable.Row>
        );
      });
    } else {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text style={{ fontSize: 16, color: '#15A085' }}>
            Nothing to show
          </Text>
        </View>
      );
    }
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
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
export default HistoryScreen;
