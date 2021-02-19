import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Container, Header, Icon, Item, Input, Text } from 'native-base';

import productsData from '../../assets/data/products.json';
import categoriesData from '../../assets/data/categories.json';
import Product from './Product';
import SearchedProducts from './SearchedProducts';
import Banner from '../../shared/Banner';
import CategoryFilter from './CategoryFilter';

const numOfColumns = 2;
const { height } = Dimensions.get('window');

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [focus, setFocus] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState(-1);
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    setProducts(productsData);
    setFilteredProducts(productsData);
    setCategories(categoriesData);
    setInitialState(productsData);
    setProductsCtg(productsData);

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
  const changeCtg = (ctg) => {
    {
      ctg === 'all'
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter((i) => i.category._id === ctg),
              setActive(true)
            ),
          ];
    }
  };

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
        <ScrollView>
          <View>
            <View>
              <Banner />
            </View>
            <View>
              <CategoryFilter
                categories={categories}
                categoryFilter={changeCtg}
                productsCtg={productsCtg}
                active={active}
                setActive={setActive}
              />
            </View>
            {productsCtg.length > 0 ? (
              <View style={styles.listContainer}>
                {productsCtg.map((item) => {
                  return <Product key={item._id} item={item} />;
                })}
              </View>
            ) : (
              <View style={[styles.center, { height: height / 2 }]}>
                <Text>No products found</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gainsboro',
  },
  listContainer: {
    height,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductContainer;
