import React, {Component, useEffect} from 'react';
import {Text, StyleSheet, View, Alert, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {useSelector, useDispatch} from 'react-redux';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {gelAllPost} from './../commons/Query';
import PostItem from './../commons/PostItem';
import {FlatList} from 'react-native-gesture-handler';

const PostPage = ({state, navigation}) => {
  const {data, error, loading} = useQuery(gelAllPost);

  if (data) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('PostAdd')}>
          <Text>Ekle</Text>
        </TouchableOpacity>
        <FlatList
          data={data.getPost}
          renderItem={({item}) => <PostItem key={item.id} item={item} />}
        />
      </View>
    );
  }
  if (loading) {
    return (
      <View>
        <Text>Post yükleniyor</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  addButton: {
    marginHorizontal: 15,
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 5,
  },
  container: {flex: 1},
});

const mapStateToProps = state => {
  return {Login: state.login, user: state.user};
};
export default connect(mapStateToProps)(PostPage);
