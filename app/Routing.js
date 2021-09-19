import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import PostPage from './components/PostPage';
import {connect} from 'react-redux';
import {Button} from 'react-native';
import Drawer from './navigator/Drawer';

const HomeStack = createNativeStackNavigator();

class Router extends Component {
  render() {
    const login = this.props.Login.isLoggedIn;
    return (
      <NavigationContainer>
        <HomeStack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false}}>
          <HomeStack.Screen name="Login" component={LoginPage} />
          <HomeStack.Screen name="Register" component={RegisterPage} />
          {login ? <HomeStack.Screen name="Drawer" component={Drawer} /> : null}
        </HomeStack.Navigator>
      </NavigationContainer>
    );
  }
}
const mapStateToProps = state => {
  return {Login: state.login};
};

export default connect(mapStateToProps)(Router);
