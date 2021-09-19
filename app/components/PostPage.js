import React, {Component} from 'react';
import {Text, StyleSheet, View, Alert, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {useSelector, useDispatch} from 'react-redux';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {gelAllPost} from './../commons/Query';
import PostItem from './../commons/PostItem';

const PostPage = ({state, navigation}) => {
  const {data, error, loading} = useQuery(gelAllPost, {
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
  if (data) {
    return (
      <View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('PostAdd')}>
          <Text>Ekle</Text>
        </TouchableOpacity>
        {data.getPost.map(item => (
          <PostItem key={item.id} item={item} />
        ))}
      </View>
    );
  }
  if (loading) {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  addButton: {
    marginHorizontal: 15,
    marginTop: 10,
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {Login: state.login, user: state.user};
};
export default connect(mapStateToProps)(PostPage);
