import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';
import Textinput from '../commons/Textinput';
import Buttons from '../commons/Buttons';
import LoginActions from '../redux/actions/loginAction';
import {connect, useDispatch} from 'react-redux';
import {login} from '../redux/actions/loginAction';

const LoginPage = ({navigation}) => {
  const dispatch = useDispatch();
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
              .min(5, ({min}) => `Minimum ${min} karakter giriniz.`)
              .required('Şifre zorunlu'),
          })}
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={async (values, {resetForm}) => {
            dispatch(LoginActions.setLoginState(true));
            console.log(this.state.isLogin);
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
                <Text>Hesabınız var mı? </Text>
                <Buttons />
                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.registerText}>Hesaba giriş yap</Text>
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
  return {
    Login: state.isLogin,
  };
};

export default connect(mapStateToProps)(LoginPage);
