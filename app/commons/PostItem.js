import React, {Component, useEffect} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';
import localization from 'moment/locale/tr';
import {connect} from 'react-redux';

import {useNavigation} from '@react-navigation/native';

const PostItem = props => {
  let {body, olusturulmaTarihi} = props.item;

  const {kullaniciAd, id} = props.item.kullanici;
  const navigation = useNavigation();
  olusturulmaTarihi = moment.unix(olusturulmaTarihi / 1000).format('lll');
  return (
    <View style={styles.item}>
      <View style={styles.uparea}>
        <Text style={styles.yazar}>{kullaniciAd}</Text>
        {props.user.id === id ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PostUpdate', {postId: props.item.id, body});
            }}>
            <Text>Düzenle</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <Text style={styles.body}>{body}</Text>
      <Text style={styles.body}>{olusturulmaTarihi}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {backgroundColor: '#ff8', marginBottom: 8, marginHorizontal: 15},
  yazar: {fontWeight: '800'},
  body: {marginLeft: 50},
  uparea: {flexDirection: 'row', justifyContent: 'space-between'},
});

const mapStateToProps = state => {
  return {user: state.user};
};

export default connect(mapStateToProps)(PostItem);
