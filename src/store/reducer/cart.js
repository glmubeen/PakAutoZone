import {ADD_ITEM, REMOVE_ITEM, EMPTY_CART} from '../actionType';

// init state
const initState = {
  cart: [],
  total: 0,
};

export default reducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      // make a copy
      const tempCart = [...state.cart];
      let tempPrice = state.total;

      // find the current obj Ind
      let currentItemInd = tempCart.findIndex(i => i._id === action.item._id);
      if (currentItemInd !== -1) {
        // already exists
        let oldObj = {...tempCart[currentItemInd]};
        // update quantity
        oldObj.quantity += action.quantity;

        // update price
        tempPrice += parseInt(action.item.price) * action.quantity;
        // putting back into cart
        tempCart[currentItemInd] = oldObj;
      } else {
        // add a quantity property
        let tempNewObj = {...action.item, quantity: action.quantity};
        // this item is new one just push
        tempCart.push(tempNewObj);
        // update price

        tempPrice += parseInt(action.item.price) * action.quantity;
      }
      return {
        ...state,
        cart: tempCart,
        total: tempPrice,
      };

    case REMOVE_ITEM:
      // make a copy
      let tempCartR = [...state.cart];
      let tempPriceR = state.total;
      let currentItemIndR = tempCartR.findIndex(i => i._id === action.item._id);

      if (currentItemIndR !== -1) {
        // OBJ
        let tempItemObj = {...tempCartR[currentItemIndR]};

        tempItemObj.quantity -= 1;
        tempPriceR -= parseInt(action.item.price);

        // putting it back
        tempCartR[currentItemIndR] = tempItemObj;
        // if quantity is 0 then remove it from array
        if (tempItemObj.quantity === 0) {
          tempCartR.splice(currentItemIndR, 1);
        }
      }

      return {
        ...state,
        cart: tempCartR,
        total: tempPriceR,
      };

    case EMPTY_CART:
      return {
        ...state,
        cart: [],
        total: 0,
      };
    default:
      return state;
  }
};
