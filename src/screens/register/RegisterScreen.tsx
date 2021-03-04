import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image, TextInput, 
  Dimensions, 
} from "react-native";
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { useLocalization } from "../../localization";
import NavigationNames from "../../navigations/NavigationNames";
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { Theme } from "../../theme";
import { DropdownModal } from "../../modals";

const { height, width } = Dimensions.get('window');

export const RegisterScreen = props => {
  const navigation = useNavigation();
  const { getString, changeLanguage } = useLocalization();
  const [data, setData] = useState({ Mobile: null, 
                                     Name: null,
                                     Email: null,
                                     Gender_ID: 1,
                                     Password: null 
                                  });
  const [showGenderModal, setShowGenderModal] = useState(false);
  const genders = [
    {
      text: getString('Male'),
      value: 1
    },
    {
      text: getString('Female'),
      value: 2
    }
  ]

  //Login Handler
  const loginHandler = () => {
    if (!data.Mobile || !data.Password) {
      return Toast.show({
        text1: 'من فضلك أدخل جميع الحقول',
        type: 'error',
        visibilityTime: 3000,
        position: 'top'
      });
    };

    //Send user's credintials to server
    axios
      .post('http://www.advancedcareclinics.com/api/patient/register', data)
      .then(res => {
        if (res.data.Result) {
          Toast.show({
            text1: res.data.Message,
            text2: 'مرحبا بك',
            type: 'success',
            visibilityTime: 3000,
          });
          return props.navigation.navigate('home', { empId: res.data.data.Emp_ID });
        }
        // In case of wrong credentials
        return Toast.show({
          text1: res.data.MessageAr,
          type: 'error',
          visibilityTime: 3000,
        });
      })
      .catch(error => {
        // In case of error
        return Toast.show({
          text1: error?.response?.data?.MessageAr,
          type: 'error',
          visibilityTime: 3000,
        });
      });

  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Animatable.View
        animation={'fadeInDown'}
        style={styles.loginHeader}
      >
        <Image
          source={require('../../..//assets/logo.png')}
          style={{ width: 150, height: 80, marginTop: 50 }}
          resizeMode={'contain'}
        />
        <Text style={styles.title}>
          {getString('Register')}
        </Text>
      </Animatable.View>
      <View style={styles.loginForm}>
        <TextInput
          placeholder={getString('insertName')}
          placeholderTextColor="#CCC"
          onChangeText={(val) => setData({ ...data, Name: val })}
          style={styles.textInputContainer}
        />
        <TextInput
          placeholder={getString('insertEmail')}
          placeholderTextColor="#CCC"
          keyboardType={'email-address'}
          onChangeText={(val) => setData({ ...data, Email: val })}
          style={styles.textInputContainer}
        />
        <TextInput
          placeholder={getString('insertMobile')}
          placeholderTextColor="#CCC"
          keyboardType={'number-pad'}
          onChangeText={(val) => setData({ ...data, Mobile: val })}
          style={styles.textInputContainer}
        />
        <TouchableOpacity
          activeOpacity={.65}
          style={styles.genderContainer}
          onPress={() => setShowGenderModal(true)}
        >
          <Text>{genders.find((gender) => gender.value === data.Gender_ID).text}</Text>
          <Ionicons
            name={'ios-arrow-down'}
            size={24}
            color={Theme.colors.grayForItemsArrow}
          />
        </TouchableOpacity>
        <TextInput
          placeholder={getString('insertPassword')}
          placeholderTextColor="#CCC"
          secureTextEntry={true}
          onChangeText={(val) => setData({ ...data, Password: val })}
          style={styles.textInputContainer}
        />
        <RectButton
          style={styles.loginButton}
          onPress={loginHandler}
        >
          <Text style={styles.loginButtonText}>
            {getString('Register')}
          </Text>
        </RectButton>
        <BorderlessButton
          style={styles.registerButton}
          onPress={() => navigation.navigate(NavigationNames.LoginScreen)}>
          <Text style={styles.registerText}>
            {getString('HaveAccount')} <Text style={styles.registerButtonText}>{getString('Login')}</Text>
          </Text>
        </BorderlessButton>
      </View>
      <DropdownModal
        text={getString("Gender")}
        isVisible={showGenderModal}
        items={genders}
        selectedDate={data.Gender_ID}
        onDismissModal={() => {
          setShowGenderModal(false);
        }}
        onConfirmModal={(value) => {
          setShowGenderModal(false);
          setData({...data, Gender_ID: value});
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#FFF',
  },
  loginHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#CCC',
    marginTop: 30
  },
  loginForm: {
    flex: 4,
    width: width - 40,
    marginTop: 60
  },
  textInputContainer: {
    padding: 15,
    borderRadius: 8,
    borderWidth: .6,
    borderColor: '#CCC',
    marginBottom: 15,
    textAlign: 'right'
  },
  loginButton: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: Theme.colors.primaryColor,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginTop: 15
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '600'
  },
  genderContainer: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 8,
    textAlign: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: .6,
    borderColor: '#CCC',    
    marginBottom: 15,
    padding: 15
  },
  registerText: {
    fontWeight: '600',
    color: Theme.colors.gray,
    marginTop: 15
  },
  registerButton: {
    width: '70%',
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'flex-end'
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.colors.primaryColor
  }
});
