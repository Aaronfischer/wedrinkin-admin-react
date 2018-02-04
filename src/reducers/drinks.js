import { createSelector } from 'reselect';
import { DRINKS_FETCHED, DRINK_CREATED, DRINK_FETCHED } from '../types';

export default function drinks(state = {}, action = {}) {
  switch (action.type) {
    case DRINKS_FETCHED:
    case DRINK_CREATED:
      return { ...state, ...action.data.entities.drinks };
    case DRINK_FETCHED:
      return { ...state, ...action.data.entities.drink };
    default:
      return state;
  }
}

// Selectors
export const drinksSelector = state => state.drinks;

export const allDrinksSelector = createSelector(drinksSelector, drinksHash =>
  Object.values(drinksHash)
);

export const drinkSelector = state => {
  console.log('drinkSelector state', state);
  return state.drink;
};
