import React, {useContext, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, Linking} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Draw from './Draw';
import Authentication from './Authentication';
import {AuthContext} from '../context/AuthContext';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen/Index';
import SignInScreen from '../screens/SigninScreen/Index';
import VerifyOTPScreen from '../screens/VerifyOTPScreen/Index';
import ResetPassword from '../screens/ResetPassword/Index';
import VerifyPasswordScreen from '../screens/VerifyPassword/Index';
import Tracking from '../screens/TrackingScreen/Index';
import SignUpScreen from '../screens/SignUpScreen/Index';
import ActivityHistoryScreen from '../screens/ActivityHistoryScreen/Index';
import HomeScreen from '../screens/HomeScreen/Index';
import {createDrawerNavigator} from '@react-navigation/drawer';
import EmailVerificationResultScreen from '../screens/EmailVerificationResult/Index';
// Import other screens as needed

const Stack = createNativeStackNavigator();

const AppMain = ({route}) => {
  const {isLoading, userToken} = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={styles.root}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {userToken !== null ? (
          <>
            <Stack.Screen name="Main" component={Draw} />

            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen
              name="VerifyPassword"
              component={VerifyPasswordScreen}
            />
            <Stack.Screen name="Tracking" component={Tracking} />
            <Stack.Screen
              name="ActivityHistory"
              component={ActivityHistoryScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Authentication" component={Authentication} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
            <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="verify-email" component={EmailVerificationResultScreen} />
            {/* Add other screens as needed */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppMain;
