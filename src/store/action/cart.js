import {ADD_ITEM, EMPTY_CART, REMOVE_ITEM} from '../actionType';

export const handleAddItemToCart = (item, quantity) => {
  return {
    type: ADD_ITEM,
    item,
    quantity: quantity,
  };
};

export const handleRemoveItem = item => {
  return {
    type: REMOVE_ITEM,
    item,
  };
};

export const handleEmptyCart = item => {
  return {
    type: EMPTY_CART,
    item,
  };
};
