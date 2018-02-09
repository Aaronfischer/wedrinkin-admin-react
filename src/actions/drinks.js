import { normalize } from 'normalizr';
import {
  DRINKS_FETCHED,
  DRINK_CREATED,
  DRINK_UPDATED,
  DRINK_FETCHED
} from '../types';
import api from '../api.js';
import { drinkSchema } from '../schemas';

// data.entities.drinks
const drinksFetched = data => ({
  type: DRINKS_FETCHED,
  data
});

const drinkFetched = data => ({
  type: DRINK_FETCHED,
  data
});

const drinkCreated = data => ({
  type: DRINK_CREATED,
  data
});

const drinkUpdated = data => ({
  type: DRINK_UPDATED,
  data
});

export const fetchDrinks = () => dispatch =>
  api.drinks
    .fetchAll()
    .then(drinks => {
      return dispatch(drinksFetched(normalize(drinks, [drinkSchema])))
    });

export const fetchDrink = data => dispatch =>
  api.drinks
    .fetch(data)
    .then(drink => {
      console.log('drink', drink);
      return dispatch(drinkFetched(normalize(drink, drinkSchema)))
    });

export const createDrink = data => dispatch =>
  api.drinks
    .create(data)
    .then(drink => dispatch(drinkCreated(normalize(drink, drinkSchema))));

export const updateDrink = data => dispatch =>
  api.drinks
    .update(data)
    .then(drink => dispatch(drinkUpdated(normalize(drink, drinkSchema))));
