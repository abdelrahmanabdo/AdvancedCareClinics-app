import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle
} from "react-native";
import { DoctorModel } from "../../models";
import { Avatar } from "../avatar";
import { Theme } from "../../theme";
import { AirbnbRating } from "react-native-ratings";
import { Ionicons } from "@expo/vector-icons";
import { DoctorDetailsBottomSheet } from "../../modals";

type TProps = {
  item: DoctorModel;
  style?: ViewStyle;
};

export const DoctorItemRow: React.FC<TProps> = props => {
  const [visibleModal, setVisibleModal] = useState(false);
  return (
    <>
      <View style={[styles.container, props.style]}>
        <Avatar
          status={props.item.isOnline ? "online" : null}
          source={props.item.DoctorImg 
                  ? {uri: `data:image/png;base64,${props.item.DoctorImg}`} 
                  : require('../../../assets/doctor.png')}
          style={styles.avatar}
        />
        <View style={styles.textContent}>
          <Text style={styles.doctorNameText}>{props.item.DoctorName}</Text>
          <Text style={styles.doctorTitleText}>{props.item.Specialty_NameAr}</Text>
          {/* <View style={{ alignSelf: "flex-start", marginTop: 2 }}>
            <AirbnbRating
              showRating={false}
              count={5}
              size={17}
              isDisabled
              selectedColor={"orange"}
              defaultRating={props.item.rating}
            /> 
          </View> */}
        </View>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => setVisibleModal(true)}
        >
          <Ionicons
            size={24}
            name="ios-arrow-forward"
            color={Theme.colors.grayForItemsMore}
          />
        </TouchableOpacity>
      </View>
      {/* <DoctorDetailsBottomSheet
        doctor={props.item}
        isVisible={visibleModal}
        onDismissModal={() => setVisibleModal(false)}
      /> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 14
  },
  avatar: { alignSelf: "center" },
  textContent: { flex: 1, paddingHorizontal: 14 },
  doctorNameText: {
    fontSize: 15,
    fontWeight: "600",
    color: Theme.colors.black
  },
  doctorTitleText: {
    marginTop: 4,
    color: Theme.colors.gray,
    fontSize: 13
  },
  moreButton: {
    paddingHorizontal: 16,
    paddingVertical: 2,
    alignSelf: "flex-start"
  }
});
