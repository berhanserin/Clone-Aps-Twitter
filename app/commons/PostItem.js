import React, {Component, useEffect} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';
import localization from 'moment/locale/tr';

const PostItem = props => {
  let {body, olusturulmaTarihi} = props.item;
  const {kullaniciAd} = props.item.kullanici;
  olusturulmaTarihi = moment.unix(olusturulmaTarihi / 1000).format('lll');

  return (
    <SafeAreaView style={styles.item}>
      <View style={styles.uparea}>
        <Text style={styles.yazar}>{kullaniciAd}</Text>
        <TouchableOpacity
          onPress={() => {
            console.log('düzenle');
          }}>
          <Text>Düzenle</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.body}>{body}</Text>
      <Text style={styles.body}>{olusturulmaTarihi}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {backgroundColor: '#ff8', marginTop: 12, marginHorizontal: 15},
  yazar: {fontWeight: '800'},
  body: {marginLeft: 50},
  uparea: {flexDirection: 'row', justifyContent: 'space-between'},
});

export default PostItem;
