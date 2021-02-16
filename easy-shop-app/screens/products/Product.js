import React from 'react';
import { View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import ProductCard from './ProductCard';

const { width } = Dimensions.get('window');

const Product = ({ item }) => {
  // if (item.empty) return <View style={[styles.itemView]} />;
  return (
    <TouchableOpacity>
      <View style={styles.itemView}>
        <ProductCard {...item} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemView: {
    width: width / 2,
  },
});

export default Product;
