import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image, TextInput, 
  Dimensions,
  I18nManager,
} from "react-native";
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";
import { useLocalization } from "../../localization";
import NavigationNames from "../../navigations/NavigationNames";
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { Theme } from "../../theme";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window');

export const LoginScreen = props => {
  const navigation = useNavigation();
  const { getString, changeLanguage } = useLocalization();
  const [data, setData] = useState({ Mobile: null, Password: null });

  useEffect(() => {

  }, []);

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
      .post('http://www.advancedcareclinics.com/api/patient/login', data)
      .then(async (res) => {
        if (res.data.Result) {
          Toast.show({
            text1: res.data.Message,
            text2: 'مرحبا بك',
            type: 'success',
            visibilityTime: 3000,
          });
          await AsyncStorage.setItem('user', JSON.stringify(res.data.Data));
          return navigation.navigate('HomeScreen', { empId: res.data.Data.ID });
        }

        return Toast.show({
          text1: res.data.MessageAr,
          type: 'error',
          visibilityTime: 3000,
        });
      })
      .catch(error => {
        return Toast.show({
          text1: error.response.data.MessageAr,
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
        <Text
          style={styles.title}
        >
          {getString('Login')}
        </Text>
      </Animatable.View>
      <View
        style={styles.loginForm}
      >
        <TextInput
          placeholder={getString('insertMobile')}
          placeholderTextColor="#CCC"
          keyboardType={'number-pad'}
          onChangeText={(val) => setData({ ...data, Mobile: val })}
          style={styles.textInputContainer}
        />
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
            {getString('Login')}
          </Text>
        </RectButton>
        <BorderlessButton 
          style={styles.registerButton}
          onPress={() => navigation.navigate(NavigationNames.RegisterScreen)}>
          <Text style={styles.registerText}>
            {getString('DonnotHaveAccount')} <Text style={styles.registerButtonText}>{getString('Register')}</Text>
            </Text>
        </BorderlessButton>
      </View>
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
    flex: 2,
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
  registerText :{
    fontWeight: '600',
    color: Theme.colors.gray,
    marginTop: 15
  },
  registerButton: {
    width:'70%',
    borderRadius: 5,
    marginTop: 10,
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end'

  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.colors.primaryColor
  }
});
