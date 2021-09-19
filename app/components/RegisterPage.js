import React, {Component, useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
import Textinput from '../commons/Textinput';
import Buttons from '../commons/Buttons';
import * as yup from 'yup';
import {Formik} from 'formik';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {RegisterMutations} from '../commons/Mutation';

const RegisterPage = ({navigation}) => {
  const [registerMuta] = useMutation(RegisterMutations, {
    onError: _err => {
      Alert.alert('Kayıt Sorunu', 'Kullanıcı adı ve/veya Email kayıtlı', [
        {
          text: 'Tamam',
          style: 'default',
          // onPress:()=>
        },
      ]);
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.loginArea}>
        <Formik
          validationSchema={yup.object().shape({
            uname: yup
              .string()
              .min(5, ({min}) => `Minimum ${min} Harf Giriniz.`)
              .required('Kullanıcı Adı Zorunlu'),
            email: yup
              .string()
              .email('Email Adresini Giriniz.')
              .required('Email Adresi Zorunlu'),
            password: yup
              .string()
              .min(5, ({min}) => `Minimim ${min} Harf Giriniz.`)
              .required('Şifre Zorunlu'),
            confirmPassword: yup
              .string()
              .oneOf([yup.ref('password'), null], 'Şifre eşdeğer değil')
              .required('Şifre eşdeğer değil'),
          })}
          initialValues={{
            email: '',
            password: '',
            confirmPassword: '',
            uname: '',
          }}
          onSubmit={async (values, {resetForm}) => {
            const {data, loading, error} = await registerMuta({
              variables: {
                uname: values.uname,
                enamil: values.email,
                password: values.password,
                conpassword: values.confirmPassword,
              },
            });
            resetForm({values: ''});
            if (data && data.uyeOl) {
              Alert.alert('Kayıt', 'Kayıt tamalandı. Giriş yapabilirsiniz.', [
                {
                  text: 'Tamam',
                  style: 'default',
                  // onPress:()=>
                },
              ]);
              navigation.goBack();
            }
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            resetForm,
            isValid,
          }) => (
            <View>
              <Textinput
                placeholder="Kullanıcı Adı"
                value={values.uname}
                ChangeText={handleChange('uname')}
                Blur={handleBlur('uname')}
                password={false}
                style={styles.textInput}
              />
              {errors.uname && (
                <Text style={styles.errors}>{errors.uname}</Text>
              )}
              <Textinput
                placeholder="E-posta"
                ChangeText={handleChange('email')}
                Blur={handleBlur('email')}
                placeholderTextColor="grey"
                value={values.email}
                style={styles.textInput}
                type="email-address"
              />
              {errors.email && (
                <Text style={styles.errors}>{errors.email}</Text>
              )}
              <Textinput
                style={styles.textInput}
                placeholder="Şifre"
                ChangeText={handleChange('password')}
                Blur={handleBlur('password')}
                placeholderTextColor="grey"
                value={values.password}
                password={true}
              />
              {errors.password && (
                <Text style={styles.errors}>{errors.password}</Text>
              )}
              <Textinput
                style={styles.textInput}
                placeholder="Şifre Tekrar"
                ChangeText={handleChange('confirmPassword')}
                Blur={handleBlur('confirmPassword')}
                placeholderTextColor="grey"
                value={values.confirmPassword}
                password={true}
              />
              {errors.confirmPassword && (
                <Text style={styles.errors}>{errors.confirmPassword}</Text>
              )}
              <Buttons
                text="Hesap Oluştur"
                btnstyle={styles.girisYapSubmit}
                textstyle={styles.submidText}
                click={handleSubmit}
              />
            </View>
          )}
        </Formik>
        <View style={styles.registerArea}>
          <Text>Hesabınız var mı? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.registerText}>Hesaba giriş yap</Text>
          </TouchableOpacity>
        </View>
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

export default RegisterPage;
