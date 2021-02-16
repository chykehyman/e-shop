import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { Container, Header, Icon, Item, Input } from 'native-base';

import productData from '../../assets/data/products.json';
import Product from './Product';
import SearchedProducts from './SearchedProducts';
import Banner from '../../shared/Banner';

const numOfColumns = 2;

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    setProducts(productData);
    setFilteredProducts(productData);

    return () => {
      setProducts([]);
    };
  }, []);

  const searchProduct = (text) => {
    setFilteredProducts(
      products.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const openList = () => setFocus(true);
  const closeList = () => setFocus(false);

  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Search"
            onFocus={openList}
            onChangeText={(text) => searchProduct(text)}
          />
          {focus ? <Icon onPress={closeList} name="ios-close" /> : null}
        </Item>
      </Header>
      {focus ? (
        <SearchedProducts filteredProducts={filteredProducts} />
      ) : (
        <View style={styles.container}>
          <View>
            <Banner />
          </View>
          <View style={{ marginTop: 10 }}>
            <FlatList
              numColumns={numOfColumns}
              data={products}
              renderItem={({ item }) => <Product item={item} />}
              keyExtractor={(item) => item._id}
            />
          </View>
        </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gainsboro',
  },
});

export default ProductContainer;
