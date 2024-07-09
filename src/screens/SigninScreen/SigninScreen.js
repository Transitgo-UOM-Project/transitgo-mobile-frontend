import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import React, {useState, useContext} from 'react';
import logo from '../../../assets/images/logo.png';
import CustomInput from '../../components/CustomInput/Index';
import CustomButton from '../../components/CustomButton/Index';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '@/src/context/AuthContext';

const SigninScreen = () => {
  const {login} = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {height} = useWindowDimensions();
  const navigation = useNavigation();

  const onSignInPressed = () => {
    login(username, password);
  };

  const onForgotPasswordPressed = () => {
    console.warn('forgot password');
    navigation.navigate('ConfirmEmail');
  };

  const onSignInGoogle = () => {
    console.warn('google');
    // navigation.navigate('HomeScreen')
  };
  const onSignUpPressed = () => {
    console.warn('SignUp');
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.root}>
      <Image
        source={logo}
        style={[styles.logo, {height: height * 0.3}]}
        resizeMode="contain"
      />
      <CustomInput
        placeholder="Email address"
        value={username}
        setValue={setUsername}
        icon="user"
      />
      <CustomInput
        placeholder="Password"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
        icon="lock"
      />

      <CustomButton text="Sign In" onPress={onSignInPressed} />
      <View style={styles.sec}>
        <View>
          <CustomButton
            text="Forgot Password?"
            onPress={onForgotPasswordPressed}
            type="tertiary2"
          />
        </View>
      </View>

      <CustomButton
        text="Sign in with Google"
        onPress={onSignInGoogle}
        type="special"
        icon=""
      />
      <CustomButton
        text="Don't Have an account? Sign up"
        onPress={onSignUpPressed}
        type="tertiary1"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 500,
    maxHeight: 300,
  },

  sec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default SigninScreen;
