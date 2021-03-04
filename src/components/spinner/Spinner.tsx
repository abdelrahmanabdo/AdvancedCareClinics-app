import React from "react";
import { View, Image, StyleSheet, ViewStyle } from "react-native";
import { Theme } from "../../theme";

type TProps = {
};

export const Spinner: React.FC<TProps> = props => {
  return (
    <View
      style={[styles.container]}
    >
      <Image 
        source={ require("../../../assets/spinner.gif") } 
        style={styles.logo} 
        resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent:'center',
    alignItems: 'center'
  },
  logo :{ 
    width: 300, 
    height: 300,
  }
});
