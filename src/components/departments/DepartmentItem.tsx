import React from "react";
import { View, Text, StyleSheet, Image, ViewStyle } from "react-native";
import { Theme } from "../../theme";
import { DepartmentModel } from "../../models";

type TProps = {
  item: DepartmentModel;
  style?: ViewStyle;
  showShortDesc?: boolean;
};

export const DepartmentItem: React.FC<TProps> = props => {
  return (
    <View style={[styles.container, props.style]}>
      <Image
        source={props.item.Img ? {uri: props.item.Img } : require('../../../assets/logo-black.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {props.item.NameAr}
        </Text>
        {props.showShortDesc && (
          <Text style={styles.shortDesc} numberOfLines={2}>
            {props.item.ShortDescription}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "auto",
    minWidth: 110,
    backgroundColor: "white",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Theme.colors.grayForBoxBackground,
    shadowColor: Theme.colors.grayForBoxBackground,
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  image: {
    height: 74,
    width: 74,
    alignSelf:'center',
  },
  textContainer: {
    padding: 12,
    marginBottom: 2
  },
  title: {
    color: Theme.colors.black,
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center"
  },
  shortDesc: {
    color: Theme.colors.gray,
    marginTop: 2,
    fontSize: 13
  }
});
