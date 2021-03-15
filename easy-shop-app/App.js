import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Header from './shared/Header';
import AppStack from './navigators/AppStack';

export default App = () => {
  return (
    <NavigationContainer>
      <Header />
      <AppStack />
    </NavigationContainer>
  );
};
