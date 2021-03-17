import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import { Container, Text, Left, Right, H1 } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { createSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as actions from '../../redux/actions/cartActions';
import CartItem from './CartItem';

var { height, width } = Dimensions.get('window');

export const cartItemSelector = (state) => state.cartItems;

const getTotalCartPrice = createSelector(cartItemSelector, (cartItems) => {
  let total = 0;
  cartItems.forEach((cart) => (total += cart.product.price));
  return total;
});

const Cart = (props) => {
  const cartItems = useSelector(cartItemSelector);
  const totalPrice = useSelector((state) => getTotalCartPrice(state));
  const dispatch = useDispatch();

  return (
    <>
      {cartItems.length ? (
        <Container>
          <H1 style={{ alignSelf: 'center' }}>Cart</H1>
          <SwipeListView
            data={cartItems}
            renderItem={(data) => <CartItem item={data.item} />}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  style={styles.hiddenButton}
                  onPress={() => dispatch(actions.removeFromCart(data.item))}
                >
                  <Icon name="trash" color={'white'} size={30} />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={() => Math.random().toString()}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
          />
          <View style={styles.bottomContainer}>
            <Left>
              <Text style={styles.price}>${totalPrice.toFixed(2)}</Text>
            </Left>
            <Right>
              <Button
                title="Clear"
                onPress={() => dispatch(actions.clearCart())}
              />
            </Right>
            <Right>
              <Button
                secondary
                title="Checkout"
                onPress={() => props.navigation.navigate('Checkout')}
              />
            </Right>
          </View>
        </Container>
      ) : (
        <Container style={styles.emptyContainer}>
          <Text>Looks like your cart is empty</Text>
          <Text>Add products to your cart to get started</Text>
        </Container>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
    elevation: 20,
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: 'red',
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  hiddenButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
});

export default Cart;
