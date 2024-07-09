import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import StartScreen from '../screens/StartScreen/Index';
import SigninScreen from '../screens/SigninScreen/Index';
import EmployeeSigninScreen from '../screens/EmployeeSigninScreen/Index';
import SignUpScreen from '../screens/SignUpScreen/Index';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen/Index';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen/Index';
import ResetPasswordScreen from '../screens/ResetPassword/Index';
import EmailVerificationScreen from '../screens/EmailVerification/Index';
import SuccessComponent from '../screens/SuccessScreen/Index';
import FailComponent from '../screens/FailScreen/Index';
import EmailVerificationResultScreen from '../screens/EmailVerificationResult/Index';
import Terms from '../screens/Terms/Index';

const Stack = createNativeStackNavigator();

const Authentication = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="SignIn" component={SigninScreen} />
      <Stack.Screen name="EmployeeSignIn" component={EmployeeSigninScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen
        name="EmailVerification"
        component={EmailVerificationScreen}
      />
      <Stack.Screen
        name="verify-email"
        component={EmailVerificationResultScreen}
      />
      <Stack.Screen name="Success" component={SuccessComponent} />
      <Stack.Screen name="Fail" component={FailComponent} />
    </Stack.Navigator>
  );
};

export default Authentication;
