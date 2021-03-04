import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  UpcomingAppoinmentRow,
  DashboardMenuItemRow,
  Divider,
  SectionHeader,
  DashboardCampaignsListItem,
  DoctorItemRow,
  DepartmentItem,
  TouchableHighlight,
  Spinner
} from "../../components";
import { DashboardItemsModel } from "../../models";
import { DashboardService } from "../../services";
import { useLocalization } from "../../localization";
import NavigationNames from "../../navigations/NavigationNames";
import { HomeMenuItemType } from "../../types";

const generateMenuItems = (
  getString: (key: string) => string
): HomeMenuItemType[] => [
  {
    row1: getString("Book an Appoinment"),
    row2: getString("6 Doctors are available"),
    iconName: "md-alarm",
    iconBack: "#73CEC1",
    action: "BookAnAppoinment"
  },
  {
    row1: getString("Online Healt Consultant"),
    row2: getString("+14 Consultants"),
    iconName: "ios-text",
    iconBack: "#FA7F5D",
    action: "OnlineHealtConsultant"
  }
];

type TProps = {};

export const HomeScreen: React.FC<TProps> = props => {
  const navigation = useNavigation();
  const { getString, changeLanguage } = useLocalization();
  const [dashboardItem, setDashboardItem] = useState<DashboardItemsModel>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    DashboardService
      .getDashboardItems()
      .then((item) => {
        setDashboardItem(item);
        setLoading(false)
      })
      .catch(() => setLoading(false));
  }, []);

  const onClickMenu = (item: HomeMenuItemType) => {
    switch (item.action) {
      case "BookAnAppoinment":
        navigation.navigate(NavigationNames.NewAppointmentScreen);
        break;
      case "LabTestsAtHome":
        //navigation.navigate(NavigationName);
        break;
      case "OnlineHealtConsultant":
        //navigation.navigate(NavigationName);
        break;
    }
  };

  if (dashboardItem === null) {
    return <Spinner/>;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* <UpcomingAppoinmentRow
        style={styles.upcomingAppoinmentRow}
        item={dashboardItem.appointment}
      /> */}
      {/* <SectionHeader title={getString("What are you looking for?")} /> */}
      {/* <FlatList
        data={generateMenuItems(getString)}
        keyExtractor={(item, index) => `key${index}ForMenu`}
        renderItem={row => (
          <TouchableHighlight onPress={() => onClickMenu(row.item)}>
            <DashboardMenuItemRow item={row.item} />
          </TouchableHighlight>
        )}
        ItemSeparatorComponent={() => <Divider h16 />}
        scrollEnabled={false}
      /> */}
      {

      }
      <SectionHeader
        title={getString("Our Departments")}
        rightTitle={getString("See More")}
        rightAction={() =>
          navigation.navigate(NavigationNames.DepartmentListScreen)
        }
      />
      <FlatList
        data={dashboardItem.Clinic}
        renderItem={row => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(NavigationNames.DoctorListScreen, {
                departmentId: row.item.ID
              })
            }
          >
            <DepartmentItem item={row.item} style={{ minWidth: 130 }} />
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        ItemSeparatorComponent={() => <View style={styles.horizontalDivider} />}
        keyExtractor={(item, index) => `key${index}ForDepartment`}
        contentContainerStyle={styles.departmentsContainer}
      />
      <SectionHeader
        title={getString("All Specialists")}
        rightTitle={getString("See More")}
        rightAction={() =>
          navigation.navigate(NavigationNames.DoctorListScreen)
        }
      />
      <FlatList
        data={dashboardItem.Doctor.slice(0, 3)}
        keyExtractor={(item, index) => `key${index}ForDoctor`}
        renderItem={row => (
          <TouchableOpacity
            style={styles.touchableDoctorItem}
            onPress={() =>
              navigation.navigate(NavigationNames.DoctorDetailScreen, {
                doctor: JSON.stringify(row.item)
              })
            }
          >
            <DoctorItemRow item={row.item} />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <Divider h16 />}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 24 },
  upcomingAppoinmentRow: {
    marginHorizontal: 16
  },
  touchableDoctorItem: {
    paddingStart: 16,
    paddingEnd: 8
  },
  campaignsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  departmentsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  horizontalDivider: { width: 12 }
});
