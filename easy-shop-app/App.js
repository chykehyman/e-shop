import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import Header from './shared/Header';
import AppStack from './navigators/AppStack';
import store from './redux/store';

export default App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Header />
        <AppStack />
      </NavigationContainer>
    </Provider>
  );
};
