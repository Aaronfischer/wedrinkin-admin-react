import { createSelector } from 'reselect';
import {
  DRINKS_FETCHED,
  DRINK_CREATED,
  DRINK_FETCHED,
  DRINK_DELETED
} from '../types';

export default function drinks(state = {}, action = {}) {
  switch (action.type) {
    case DRINKS_FETCHED:
    case DRINK_CREATED:
      return { ...state, ...action.data.entities.drinks };
    case DRINK_FETCHED:
      return { ...state, ...action.data.entities.drinks };
    case DRINK_DELETED: {
      const newState = Object.assign({}, state);
      // action.data.result is the ID of the deleted drink
      delete newState[action.data.result];
      return newState;
    }
    default:
      return state;
  }
}

// Selectors
export const drinksSelector = state => {
  return state.drinks;
};

export const allDrinksSelector = createSelector(drinksSelector, drinksHash => {
  return Object.values(drinksHash);
});

export const drinkSelector = (state, id) => {
  if (state.drinks && id) {
    return state.drinks[id];
  }
  return null;
};
