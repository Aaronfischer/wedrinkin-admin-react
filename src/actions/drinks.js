import { normalize } from 'normalizr';
import { DRINKS_FETCHED, DRINK_CREATED } from '../types';
import api from '../api.js';
import { drinkSchema } from '../schemas';

// data.entities.drinks
const drinksFetched = data => ({
  type: DRINKS_FETCHED,
  data
});

const drinkCreated = data => ({
  type: DRINK_CREATED,
  data
});

export const fetchDrinks = () => dispatch =>
  api.drinks
    .fetchAll()
    .then(drinks => dispatch(drinksFetched(normalize(drinks, [drinkSchema]))));

export const createDrink = data => dispatch =>
  api.drinks
    .create(data)
    .then(drink => dispatch(drinkCreated(normalize(drink, drinkSchema))));
