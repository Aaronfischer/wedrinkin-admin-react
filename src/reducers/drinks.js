import { createSelector } from 'reselect';
import { DRINKS_FETCHED, DRINK_CREATED, DRINK_FETCHED } from '../types';

export default function drinks(state = {}, action = {}) {
  switch (action.type) {
    case DRINKS_FETCHED:
    case DRINK_CREATED:
      console.log('drinks_fetched', {...state, ...action.data.entities.drinks});
      return { ...state, ...action.data.entities.drinks };
    case DRINK_FETCHED:
      console.log('drink_fetched', {...state, ...action.data.entities.drinks});
      return { ...state, ...action.data.entities.drinks };
    default:
      return state;
  }
}

// Selectors
export const drinksSelector = state => {
  console.log('drinksSelector', state);
  return state.drinks
};

export const allDrinksSelector = createSelector(drinksSelector, drinksHash => {
  console.log('allDrinksSelector', drinksHash);
  return Object.values(drinksHash)
});

export const drinkSelector = (state, id) => {
  console.log('drinkSelector state', state);
  if (state.drinks && id) {
    return state.drinks[id];
  }
  return null;
};
