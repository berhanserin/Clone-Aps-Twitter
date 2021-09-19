import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';
import Textinput from '../commons/Textinput';
import Buttons from '../commons/Buttons';
import {connect, useDispatch} from 'react-redux';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {LoginMutations} from './../commons/Mutation';
import {setLoginState} from '../redux/actions/loginAction';
import {setUserName} from '../redux/actions/userAction';

const LoginPage = ({navigation, state}) => {
  const [loginMut] = useMutation(LoginMutations, {
    onError: _err => {
      Alert.alert('Giriş Sorunu', 'Kullanıcı adı ve/veya Email Hatalı', [
        {
          text: 'Tamam',
          style: 'default',
          // onPress:()=>
        },
      ]);
    },
  });
  const dispatch = useDispatch();
  const successLogin = value => {
    dispatch(setLoginState(true));
    //PostList
    navigation.navigate('Drawer');
  };
  return (
    <View style={styles.container}>
      <View style={styles.loginArea}>
        <Formik
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .min(5, ({min}) => `Minimum ${min} karakter giriniz.`)
              .required('Kullanıcı adı/ Email Adresi Zorunlu'),
            password: yup
              .string()
              .min(4, ({min}) => `Minimum ${min} karakter giriniz.`)
              .required('Şifre zorunlu'),
          })}
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={async (values, {resetForm}) => {
            const {data, loading, error} = await loginMut({
              variables: {
                kname: values.email,
                password: values.password,
              },
            });
            if (data) {
              dispatch(setUserName(data.girisYap));
              successLogin(true);
            }
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <View>
              <Textinput
                placeholder="E-mail"
                value={values.email}
                type="email-address"
                ChangeText={handleChange('email')}
                Blur={handleBlur('email')}
                password={false}
                style={styles.textInput}
              />
              {errors.email && (
                <Text style={styles.errors}>{errors.email}</Text>
              )}
              <Textinput
                placeholder="Şifre"
                value={values.password}
                ChangeText={handleChange('password')}
                Blur={handleBlur('password')}
                password={true}
                style={styles.textInput}
              />
              {errors.password && (
                <Text style={styles.errors}>{errors.password}</Text>
              )}
              <View style={styles.registerArea}>
                <Text>Hesabınız yok mu? </Text>
                <Buttons />
                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.registerText}>Şimdi Kadolun</Text>
                </TouchableOpacity>
              </View>
              <Buttons
                text="Giriş Yap"
                btnstyle={styles.girisYapSubmit}
                textstyle={styles.submidText}
                click={handleSubmit}
              />
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  registerArea: {
    justifyContent: 'flex-end',
    marginTop: 10,
    flexDirection: 'row',
  },
  registerText: {color: 'orange'},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    color: '#000',
    borderRadius: 10,
    borderColor: '#000',
    marginTop: 15,
    backgroundColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
  },
  loginArea: {width: '80%'},
  errors: {fontSize: 10, color: 'red', marginTop: 5},
  girisYapSubmit: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0CD302',
    borderColor: '#0CD302',
    height: 40,
    marginTop: 25,
    borderWidth: 2,
    borderRadius: 5,
  },
  submidText: {color: '#fff', fontSize: 20},
});

const mapStateToProps = state => {
  return {Login: state.login};
};

export default connect(mapStateToProps)(LoginPage);
