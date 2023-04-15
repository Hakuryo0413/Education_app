import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';

import {images} from '../../../../constants';
import Email from '../../../../asset/icons/email';

import styles from './style';
import ForgotPasswordSVG from '../../../../asset/img/forgot-password-svg';
import axios from 'axios';

function Forgot1({navigation}) {
  const statusBarHeight = StatusBar.currentHeight;
  const [email, setEmail] = useState('');
  const [accountTypes, setAccountTypes] = useState([
    {
      name: 'Continue',
      isSelected: 'false',
    },
  ]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <ForgotPasswordSVG
          width="50%"
          height="50%"
          style={{
            alignSelf: 'center',
            marginBottom: 16,
            marginTop: statusBarHeight,
          }}></ForgotPasswordSVG>
        <Text style={styles.text1}>Forgot Password</Text>

        <Text style={styles.text2}>A handful of model sentence structures</Text>
      </View>
      <View style={styles.mid}>
        <Email width="24" height="24" style={styles.icon}></Email>

        <TextInput
          onChangeText={text => {
            setEmail(text);
          }}
          style={styles.inputText}
          paddingLeft={50}
          autoFocus={true}
          placeholder="Email"
          placeholderTextColor="black"
        />
        {accountTypes.map(accountType => (
          <TouchableOpacity
            onPress={async () => {
              const res = await axios.post(
                `http://10.0.2.2:4848/check/sendOTP`,
                {
                  email: email,
                },
              );
              alert(JSON.stringify(res.data));
              navigation.navigate('Forgot2', {
                email: email,
              });
              setAccountTypes(
                accountTypes.map(eachAccountType => {
                  return {
                    ...eachAccountType,
                    isSelected: eachAccountType.name == accountType.name,
                  };
                }),
              );
            }}
            style={styles.button}
            isSelected={accountType.isSelected}>
            <Text style={styles.textInnerBtn}>Continue</Text>
          </TouchableOpacity>
        ))}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            margin: 8,
          }}>
          <Text>We sent a</Text>
          <Text style={styles.text3}> Veritication Code </Text>
          <Text> to your Email</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Forgot1;
