import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  Image
} from "react-native";
import { DepartmentItem, Spinner, EmptyList } from "../../components";
import { useNavigation } from "@react-navigation/native";
import NavigationNames from "../../navigations/NavigationNames";
import { DepartmentsService } from "../../services";

const SCREEN_WIDTH = Dimensions.get("screen").width;


type TProps = {};

export const DepartmentListScreen: React.FC<TProps> = props => {
  const navigation = useNavigation();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    DepartmentsService
      .getDepartments()
      .then(item => { setLoading(false); setList(item) })
      .catch(() => setLoading(false));
  }, []);
  
  return (
    <>
      {
        loading ?
          <Spinner />
          :
          (
            list.length === 0 ?
            <EmptyList text={'No Departments !!'} />
            :
            <FlatList
              data={list}
              keyExtractor={(item, index) => `key${index}ForDepartment`}
              renderItem={row => (
                <TouchableOpacity
                  activeOpacity={.65}
                  onPress={() =>
                    navigation.navigate(NavigationNames.DoctorListScreen, {
                      departmentId: row.item.ID
                    })
                  }
                >
                  <DepartmentItem
                    item={row.item}
                    showShortDesc
                    style={styles.departmentItem}
                  />
                </TouchableOpacity>
              )}
              numColumns={2}
              ItemSeparatorComponent={() => <View style={styles.divider} />}
              contentContainerStyle={styles.contentContainer}
            />)
      }
    </>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  divider: { height: 4 },
  contentContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8
  },
  departmentItem: { width: SCREEN_WIDTH / 2 - 8 - 8, margin: 4 }
});
