 import React from "react";
 import { NavigationContainer } from "@react-navigation/native";
 import { createNativeStackNavigator } from "@react-navigation/native-stack";
 import Draw from "./Draw";
 import ConfirmEmailScreen from "../screens/ConfirmEmailScreen/Index";
 import SignInScreen from "../screens/SignInScreen/Index";
 import VerifyOTPScreen from "../screens/VerifyOTPScreen/Index";
 import SignUpScreen from "../screens/SignUpScreen/Index";
 import HomeScreen from "../screens/HomeScreen/Index";
 import FormConductor from "../screens/FormConductor";
 // Import other screens as needed

 const Stack = createNativeStackNavigator();

 const RootNavigator = () => {
   return (
     <NavigationContainer>
       <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="SignUp" component={SignUpScreen} />
         <Stack.Screen name="Main" component={Draw} />
         <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
         <Stack.Screen name="SignIn" component={SignInScreen} />
         <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
         <Stack.Screen name="ResetPassword" component={ResetPassword} />
         <Stack.Screen name="VerifyPassword" component={VerifyPasswordScreen}/>
         <Stack.Screen name="Tracking" component={Tracking}/>
         <Stack.Screen name="ActivityHistory" component={ActivityHistoryScreen}/>
         <Stack.Screen name="FormConductor" component={FormConductor}/>
         {/* Add other screens as needed */}
       </Stack.Navigator>
     </NavigationContainer>
   );
 };

 export default RootNavigator;