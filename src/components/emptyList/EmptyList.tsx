import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

type TProps = {
  text: string
};

export const EmptyList: React.FC<TProps> = props => {
  return (
    <View
      style={[styles.container]}
    >
      <Image 
        source={ require("../../../assets/no-results-dark.gif") } 
        style={styles.logo} 
        resizeMode="contain" />
      <Text style={styles.text}>
        { props.text }
      </Text>
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
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#404040',
    letterSpacing: 3,
  }
});
