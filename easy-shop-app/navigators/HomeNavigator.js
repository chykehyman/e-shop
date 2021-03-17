import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProductContainer from '../screens/products/ProductContainer';
import { Text, View } from 'react-native';
import Cart from '../screens/cart/Cart';
import CartIcon from '../shared/CartIcon';

const Tab = createBottomTabNavigator();

const Comp = () => <Text>Some Component</Text>;

const HomeNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      keyboardHidesTabBar: true,
      inactiveTintColor: 'gray',
      showLabel: false,
      activeTintColor: '#e91e63',
      tabStyle: {
        backgroundColor: '#fff',
        height: 60,
        paddingBottom: 12,
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={ProductContainer}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon
            name="home"
            size={30}
            style={{ position: 'relative' }}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Cart"
      component={Cart}
      options={{
        tabBarIcon: ({ color }) => (
          <View>
            <Icon name="shopping-cart" color={color} size={30} />
            <CartIcon />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Admin"
      component={Comp}
      options={{
        tabBarIcon: ({ color }) => <Icon name="cog" color={color} size={30} />,
      }}
    />
    <Tab.Screen
      name="User"
      component={Comp}
      options={{
        tabBarIcon: ({ color }) => <Icon name="user" color={color} size={30} />,
      }}
    />
  </Tab.Navigator>
);

export default HomeNavigator;
