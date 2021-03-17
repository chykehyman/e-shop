import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Left, Right, ListItem, Thumbnail, Body } from 'native-base';

const CartItem = ({ item }) => (
  <ListItem style={styles.listItem} avatar>
    <Left>
      <Thumbnail
        source={{
          uri: item.product.image
            ? item.product.image
            : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
        }}
      />
    </Left>
    <Body style={styles.body}>
      <Left>
        <Text>{item.product.name}</Text>
      </Left>
      <Right>
        <Text>{item.product.price}</Text>
      </Right>
    </Body>
  </ListItem>
);

const styles = StyleSheet.create({
  listItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  body: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default CartItem;
