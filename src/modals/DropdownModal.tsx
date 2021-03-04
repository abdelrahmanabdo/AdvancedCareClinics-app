import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { ReactNativeModal } from "react-native-modal";
import { useLocalization } from "../localization";
import { Theme } from "../theme";
import { Button } from "../components/buttons/Button";
import { Divider } from "../components/divider";
import { AppointmentTimeModal } from "../models";
import moment from "moment";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";

type TProps = {
  text: string,
  items?: any;
  isVisible: boolean;
  selectedDate: any;
  onDismissModal: () => void;
  onConfirmModal: (value) => void;
};

export const DropdownModal: React.FC<TProps> = props => {
  const { getString } = useLocalization();
  const [selectedIndex, setSelectedIndex] = useState(0);
  if (props.items === null) {
    return null;
  }

  return (
    <ReactNativeModal
      isVisible={props.isVisible}
      swipeDirection={"down"}
      style={styles.modalView}
      onSwipeComplete={props.onDismissModal}
      onBackdropPress={props.onDismissModal}
    >
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
          <Text style={styles.titleText}>
            {props.text}
          </Text>
          <View style={styles.doctorContainer}>
            {
              props.items.map((item, index) => {
                return (
                <TouchableOpacity 
                  style={{backgroundColor: selectedIndex === index ? Theme.colors.grayForItemsArrow : '#FFF',
                          padding: 15, borderRadius: 4}}
                  onPress={() => setSelectedIndex(index)} key={index}>
                    <Text style={{ color: selectedIndex === index ? Theme.colors.black : Theme.colors.gray}}>
                      {item.text}
                    </Text>
                  </TouchableOpacity>)
              })
            }
          </View>
          <Divider />
          <Button 
            onPress={() => props.onConfirmModal(props.items[selectedIndex].value)}
            title={getString("CONFIRM")} 
          />
          <Button
            title={getString("CANCEL")}
            type="outline"
            style={{ marginTop: 8 }}
            onPress={props.onDismissModal}
          />
        </View>
      </SafeAreaView>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: "white",
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    paddingBottom: 10
  },
  flex1: { flex: 1 },
  modalView: {
    justifyContent: "flex-end",
    margin: 0
  },
  container: {
    padding: 24,
    paddingBottom: 4
  },
  titleText: {
    fontSize: 18,
    fontWeight: "600",
    color: Theme.colors.black
  },
  doctorContainer: { paddingVertical: 16 },
  doctorName: {
    fontSize: 15,
    fontWeight: "600",
    color: Theme.colors.black,
    marginTop: 4
  },
  doctorTitle: {
    fontSize: 13,
    color: Theme.colors.gray,
    fontWeight: "600",
    marginTop: 2
  },
  timeContainer: {
    paddingVertical: 36,
    marginBottom: 12,
    alignItems: "center"
  },
  timeText: {
    fontSize: 62,
    fontWeight: "200",
    color: Theme.colors.black,
    marginTop: 4
  },
  dateText: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 12,
    color: Theme.colors.black
  }
});
