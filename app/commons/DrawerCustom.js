import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {connect, useSelector} from 'react-redux';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';

export function DrawerCustom({props, navigation}) {
  const user = useSelector(state => state.user);
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView style={styles.bottomDrawerSection}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={{
                  uri: 'https://avatars.dicebear.com/api/miniavs/berhan.svg',
                }}
                size={50}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>{user.kullaniciAd}</Title>
                <Caption style={styles.caption}>{user.kullaniciAd}</Caption>
              </View>
            </View>
          </View>

          <DrawerItem
            icon={({color, size}) => (
              <Icon name="log-out" size={size} color={color} />
            )}
            label="Postlar"
            onPress={() => {
              navigation.navigate('Post');
            }}
          />
        </View>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="log-out" size={size} color={color} />
          )}
          label="Çıkış Yap"
          onPress={() => {
            alert('Çıkış');
          }}
        />
      </Drawer.Section>
    </View>
  );
}
const mapStateToProps = state => {
  return {user: state.user};
};
const styles = StyleSheet.create({
  drawerContent: {flex: 1},
  userInfoSection: {
    paddingLeft: 20,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
});
