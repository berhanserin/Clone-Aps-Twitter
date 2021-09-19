import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
import {connect, useSelector} from 'react-redux';
import * as yup from 'yup';
import {Formik} from 'formik';
import Buttons from './../commons/Buttons';
import Textinput from './../commons/Textinput';
import {AddPostMutations} from './../commons/Mutation';
import {useMutation} from '@apollo/react-hooks';

const PostAdd = ({navigation, state}) => {
  const user = useSelector(state => state.user);
  const [AddPost] = useMutation(AddPostMutations, {
    onError: _err => {
      Alert.alert('Giriş Sorunu', _err.message, [
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
      <Formik
        validationSchema={yup.object().shape({
          body: yup
            .string()
            .min(5, ({min}) => `Minimum ${min} karakter giriniz.`)
            .required('Post Girmeniz Zorunlu'),
        })}
        initialValues={{
          body: '',
          id: user.id,
        }}
        onSubmit={async values => {
          console.log(values);
          const {data, error, loading} = await AddPost({
            variables: {
              uname: values.id,
              text: values.body,
            },
          });
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
              placeholder="Post"
              value={values.body}
              ChangeText={handleChange('body')}
              Blur={handleBlur('body')}
              password={false}
              style={styles.textInput}
            />
            {errors.body && <Text style={styles.errors}>{errors.body}</Text>}

            <Buttons
              text="Paylaş"
              btnstyle={styles.girisYapSubmit}
              textstyle={styles.submidText}
              click={handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    color: '#000',
    borderRadius: 10,
    borderColor: '#000',
    marginTop: 15,
    backgroundColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
  },
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
  container: {marginHorizontal: 10},
});
const mapStateToProps = state => {
  return {user: state.user};
};
export default connect(mapStateToProps)(PostAdd);
