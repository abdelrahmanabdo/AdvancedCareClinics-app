import React, { useEffect, useCallback, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Agenda } from "react-native-calendars";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DoctorModel } from "../../models";
import { Avatar, Divider, Button } from "../../components";
import { Theme } from "../../theme";
import NavigationNames from "../../navigations/NavigationNames";
import { Ionicons } from "@expo/vector-icons";
import {globalAppointmentDate} from "../../services/DashboardService";import moment from "moment";
import { useLocalization } from "../../localization";
import { DoctorsService } from "../../services";
import { FlatList } from "react-native-gesture-handler";

type TProps = {};
const weeklyAppointment = moment(globalAppointmentDate).format("DD/MM/YYYY");
const SCREEN_WIDTH = Dimensions.get("screen").width;

export const DoctorDetailScreen: React.FC<TProps> = props => {
  const route = useRoute();
  const refAgenda = useRef<Agenda>();
  const navigation = useNavigation();
  const { getString } = useLocalization();
  const [toolbarTitleHided, setToolbarTitleHided] = useState(true);

  const doctor = JSON.parse(route.params["doctor"]) as DoctorModel;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    if (toolbarTitleHided && y > 180) {
      setToolbarTitleHided(false);
      navigation.setOptions({ title: doctor.DoctorName });
    } else if (!toolbarTitleHided && y <= 180) {
      setToolbarTitleHided(true);
      navigation.setOptions({ title: " " });
    }
  };
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [items, setItems] = useState({});

  const getDoctorAvailableTimes = (lastSelectedDate) => {
    const splittedDate = lastSelectedDate.split('-');
    const convertedDate = `${splittedDate[2]}-${splittedDate[1]}-${splittedDate[0]}`;
    DoctorsService
      .getAvailableTimes(convertedDate, doctor.ID)
      .then((res) => {
        items[convertedDate] = res;
        setItems(items);
      });
  }

  useEffect(() => {
    const currentDate = moment().format("YYYY-MM").split('-');

    DoctorsService
      .getAvailableDays(currentDate[0], currentDate[1], doctor.ID)
      .then((res) => {
        if (res.length !== 0) {
          res.forEach((day) => {
            const splittedDate = day.date.split('/');
            const convertedDate = `${splittedDate[2]}-${splittedDate[1]}-${splittedDate[0]}`;
            items[convertedDate] = []
            return setItems(items);
          });
        } 
      })
      .catch((err) => {})

    navigation.setOptions({
      title: "",
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0
      }
    });
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={handleScroll}
    >
      <View style={styles.headerContainer}>
        <Avatar
          source={doctor.DoctorImg ? { uri: `data:image/png;base64,${doctor.DoctorImg}` } : require('../../../assets/doctor.png')}
          imageStyle={styles.doctorPreviewImage}
        />
        <Text style={styles.doctorInfoFullName}>{doctor.DoctorName}</Text>
        <Text style={styles.doctorInfoTitle}>{doctor.Specialty_NameAr}</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}></Text>
      </View>
      <Divider />
      <View style={styles.agendaContainer}>
        <Agenda
          ref={refAgenda}
          items={items}
          loadItemsForMonth={month => { }}
          onCalendarToggled={calendarOpened => { }}
          onDayPress={day => {
            setSelectedDate(day.dateString);
            getDoctorAvailableTimes(day.dateString);
          }}
          onDayChange={day => {}}
          selected={selectedDate}
          pastScrollRange={0}
          futureScrollRange={3}
          rowHasChanged={(r1, r2) => {
            return true;
          }}
          hideKnob={false}
          markedDates={{
            [weeklyAppointment]: {
              marked: true,
              dotColor: Theme.colors.primaryColor
            }
          }}
          onRefresh={() => { }}
          refreshing={false}
          refreshControl={null}
          theme={{
            agendaKnobColor: "#dcdcdc",
            selectedDayBackgroundColor: Theme.colors.primaryColor
          }}
          renderEmptyDate={() => { return (<View />); }}
          renderDay={(day, item) => <View />}
          disabledByDefault={true}
          renderItem={(item, firstItemInDay) => {
            alert(JSON.stringify(item))
            return (
              <View style={{ marginVertical: 8, flexDirection:'row' }}>
                <TouchableOpacity
                  style={[styles.timeContainer]}
                  onPress={() => alert('aa')}
                 >
                  <Text style={styles.timeText}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
          renderEmptyData={() => {
            return (
              <View style={styles.emptyDataContainer}>
                <Ionicons name="ios-cafe" size={32} color={Theme.colors.black} />
                <Text style={styles.emptyDataTitle}>
                  {getString("No Appointment")}
                </Text>
              </View>
            );
          }}
        />  
      </View>   
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: {
    flex: 1,
    paddingVertical: 8,
  },
  headerContainer: { paddingHorizontal: 16, alignItems: "center" },
  doctorPreviewImage: {
    width: 130,
    height: 130,
    borderRadius: 36,
    borderWidth: 0.5,
    borderColor: Theme.colors.primaryColor
  },
  doctorInfoFullName: {
    fontSize: 19,
    fontWeight: "600",
    color: Theme.colors.black,
    marginTop: 22
  },
  doctorInfoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Theme.colors.gray,
    marginTop: 6
  },
  flatListStyle: { marginTop: 16, marginBottom: 4 },
  divider: { marginHorizontal: 0, marginVertical: 12 },
  sectionContainer: { paddingHorizontal: 16, marginTop: 12 },
  agendaContainer: {
    flex: 1,
    backgroundColor: '#CCC'
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 15,
    paddingVertical: 8,
    color: Theme.colors.black
  },
  aboutText: {
    paddingVertical: 8,
    color: Theme.colors.black,
    fontSize: 15
  },
  ratingContainer: { flexDirection: "row", paddingVertical: 16 },
  ratingNumberText: {
    alignSelf: "center",
    fontSize: 32,
    fontWeight: "600",
    marginEnd: 12
  },
  rateButtonContainer: {
    paddingVertical: 8,
    flexDirection: "row"
  },
  rateButtonTitle: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    color: Theme.colors.black
  },
  infoText: {
    fontSize: 22,
    fontWeight: "600",
    paddingBottom: 12,
    marginTop: 8
  },
  calendarItem: {
    backgroundColor: "white",
    marginStart: 8,
    marginEnd: 8,
    shadowRadius: 2,
    shadowColor: "gray",
    shadowOpacity: 0.1,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  columnWrapperStyle: { marginHorizontal: 12 },
  emptyDataContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  emptyDataTitle: {
    color: Theme.colors.black,
    marginTop: 8,
    paddingHorizontal: 40,
    fontSize: 15,
    textAlign: "center",
    fontWeight: "100"
  },
  emptyDataButtonContainer: {
    marginTop: 24
  },
  timeContainer: {
    backgroundColor: Theme.colors.grayForBoxBackground,
    height: 30,
    width: SCREEN_WIDTH / 4 - 8 - 6,
    margin: 4,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",

    borderWidth: 0.3,
    borderColor: "#c2c2c2"
  },
  timeText: {
    color: Theme.colors.gray,
    fontWeight: "600"
  }
});
