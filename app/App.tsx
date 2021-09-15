import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './components/LoginPage';
import {Provider} from 'react-redux';
import {store} from './redux/store';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={LoginPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
