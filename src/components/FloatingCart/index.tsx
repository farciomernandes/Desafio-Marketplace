import React, { useState, useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  Container,
  CartPricing,
  CartButton,
  CartButtonText,
  CartTotalPrice,
} from './styles';

import formatValue from '../../utils/formatValue';

import { useCart } from '../../hooks/cart';

// Navegação no clique do TouchableHighlight

const FloatingCart: React.FC = () => {
  const { products } = useCart();

  const navigation = useNavigation();

  const cartTotal = useMemo(() => {
    console.log('VENDO PREÇO');

    const { total } = products.reduce(
      (accumulator, product) => {
        switch (product.quantity) {
          case 1:
            accumulator.total += Number(product.price);
            break;
          default:
            accumulator.total += Number(product.price * product.quantity);
            break;
        }
        return accumulator;
      },
      {
        total: 0,
      },
    );

    return formatValue(total);
  }, [products]);

  const totalItensInCart = useMemo(() => {
    console.log('VENDO ITENS');
    const { total } = products.reduce(
      (accumulator, product) => {
        switch (product.quantity) {
          case 1:
            accumulator.total += 1;
            break;
          default:
            accumulator.total += Number(product.quantity);
            break;
        }
        return accumulator;
      },
      {
        total: 0,
      },
    );

    return total;
  }, [products]);

  return (
    <Container>
      <CartButton
        testID="navigate-to-cart-button"
        onPress={() => navigation.navigate('Cart')}
      >
        <FeatherIcon name="shopping-cart" size={24} color="#fff" />
        <CartButtonText>{`${totalItensInCart} itens`}</CartButtonText>
      </CartButton>

      <CartPricing>
        <CartTotalPrice>{cartTotal}</CartTotalPrice>
      </CartPricing>
    </Container>
  );
};

export default FloatingCart;
