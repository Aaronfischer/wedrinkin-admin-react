import { createSelector } from 'reselect';
import { DRINKS_FETCHED, DRINK_CREATED } from '../types';

export default function drinks(state = {}, action = {}) {
  switch (action.type) {
    case DRINKS_FETCHED:
    case DRINK_CREATED:
      return { ...state, ...action.data.entities.drinks };
    default:
      return state;
  }
}

// Selectors
export const drinksSelector = state => state.drinks;

export const allDrinksSelector = createSelector(drinksSelector, drinksHash =>
  Object.values(drinksHash)
);
