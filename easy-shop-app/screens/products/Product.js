import React from 'react';
import { View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import ProductCard from './ProductCard';

const { width } = Dimensions.get('window');

const Product = ({ item, navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('Product Detail', { item })}
  >
    <View style={styles.itemView}>
      <ProductCard {...item} />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  itemView: {
    width: width / 2,
  },
});

export default Product;
