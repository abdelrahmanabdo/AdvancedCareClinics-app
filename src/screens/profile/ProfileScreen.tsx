import React, { Component, useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar, Divider, TouchableHighlight } from "../../components";
import { Theme } from "../../theme";
import { useLocalization } from "../../localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TProps = {};

export const ProfileScreen: React.FC<TProps> = props => {
  const { getString } = useLocalization();
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const user =  JSON.parse(await AsyncStorage.getItem('user'))
    setUser(user);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <SafeAreaView style={styles.flex1}>
      <ScrollView
        style={styles.flex1}
        contentContainerStyle={styles.scrollContainer}
      >
        <Avatar
          imageStyle={styles.imageStyle}
          source={require('../../../assets/patient.png')}
        />
        <Text style={styles.nameText}>{user?.NameAr}</Text>
        <Text style={styles.daysText}>{user?.Phone1}</Text>

        <View style={{ marginTop: 24 }}>
          {[
            {
              title: getString("My Status"),
              subtitle: "13. days",
              iconName: "ios-egg",
              iconColor: Theme.colors.primaryColor
            },
            {
              title: getString("Calendar"),
              subtitle: getString("Appointments"),
              iconName: "md-calendar",
              iconColor: "#2D9CDB"
            },
            // {
            //   title: getString("Medical"),
            //   subtitle: getString("Programs"),
            //   iconName: "ios-medkit",
            //   iconColor: "#27AE60"
            // },
            // {
            //   title: getString("Notifications"),
            //   subtitle: getString("Show All Notifications"),
            //   iconName: "md-notifications",
            //   iconColor: "#F2994A"
            // }
          ].map((item, index) => {
            return (
              <TouchableHighlight key={index} onPress={() => {}}>
                <View>
                  <View style={styles.menuRowContent}>
                    <View style={styles.iconContent}>
                      <Ionicons
                        name={item.iconName}
                        size={26}
                        color={item.iconColor}
                        style={{ alignSelf: "center" }}
                      />
                    </View>
                    <View style={styles.menuRowsContent}>
                      <Text style={styles.menuRowTitle}>{item.title}</Text>
                      <Text style={styles.menuRowSubtitle}>
                        {item.subtitle}
                      </Text>
                    </View>
                    <Ionicons
                      name="ios-arrow-forward"
                      size={24}
                      color={Theme.colors.primaryColor}
                      style={{ alignSelf: "center" }}
                    />
                  </View>
                  <Divider style={styles.divider} />
                </View>
              </TouchableHighlight>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  flex1: { flex: 1 },
  scrollContainer: { paddingVertical: 16 },
  imageStyle: {
    width: 130,
    height: 130,
    borderRadius: 36,
    borderColor: Theme.colors.primaryColor,
    borderWidth: 0.5,
    alignSelf: "center",
    marginTop: 36
  },
  nameText: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "600",
    marginTop: 16,
    color: Theme.colors.black
  },
  daysText: {
    alignSelf: "center",
    fontSize: 14,
    marginTop: 6,
    color: Theme.colors.black
  },
  menuRowContent: {
    flexDirection: "row",
    paddingStart: 12,
    paddingEnd: 16,
    paddingVertical: 16
  },
  iconContent: {
    width: 32
  },
  menuRowsContent: { paddingHorizontal: 8, flex: 1 },
  menuRowTitle: {
    fontSize: 17
  },
  menuRowSubtitle: {
    fontSize: 12,
    marginTop: 4
  },
  divider: { marginStart: 46 }
});
