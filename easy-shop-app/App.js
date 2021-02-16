import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProductContainer from './screens/products/ProductContainer';
import Header from './shared/Header';

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <ProductContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
