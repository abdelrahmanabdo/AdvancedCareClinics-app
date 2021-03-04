import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DoctorItemRow, Divider, Spinner, EmptyList } from "../../components";
import { useLocalization } from "../../localization";
import NavigationNames from "../../navigations/NavigationNames";
import { DoctorsService } from "../../services";
interface RouteParams {
  departmentId: number
}

type TProps = {};

export const DoctorListScreen: React.FC<RouteParams> = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getString, changeLanguage } = useLocalization();

  useEffect(() => {
    /**
     * Display specific department doctors or display all active doctors
     */
    if (route.params && route.params.hasOwnProperty('departmentId')) {
      DoctorsService
        .getSpecialtyDoctors(route.params.departmentId)
        .then(item => { setLoading(false); setList(item) })
        .catch(() => setLoading(false));
    } else {
      DoctorsService
        .getActiveDoctors()
        .then(item => { setLoading(false); setList(item) })
        .catch(() => setLoading(false));
    }
  }, []);

  return (
    <>
      {
        loading ?
        <Spinner />
        :
        (
        list.length === 0 ?
        <EmptyList text={getString('NoDoctors')} />
        :
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={.7}
              onPress={() =>
                navigation.navigate(NavigationNames.DoctorDetailScreen, {
                  doctor: JSON.stringify(item)
                })
              }
              style={styles.itemRowContainer}
            >
              <DoctorItemRow item={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => `key${index}ForDoctor`}
          ItemSeparatorComponent={() => <Divider />}
          contentContainerStyle={{ paddingVertical: 12 }}
          style={styles.container}
        />)
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  itemRowContainer: { paddingStart: 16, paddingEnd: 8 }
});
