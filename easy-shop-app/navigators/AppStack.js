import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Icon } from 'native-base';

import HomeNavigator from './HomeNavigator';
import SingleProduct from '../screens/products/SingleProduct';

const Stack = createStackNavigator();

export default AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeNavigator}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Product Detail"
      component={SingleProduct}
      options={({ navigation }) => ({
        headerTitle: '',
        headerLeft: () => (
          <Button
            iconRight
            style={{ margin: 20, backgroundColor: 'transparent' }}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" style={{ color: '#555' }} />
          </Button>
        ),
      })}
    />
  </Stack.Navigator>
);
