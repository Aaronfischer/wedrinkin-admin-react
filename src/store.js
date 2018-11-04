import React, { Component } from 'react';
import axios from 'axios';
import { initStore } from 'react-waterfall';
// import movies from './movies.json'



const fakeFetch = () =>
  new Promise(resolve => setTimeout(() => resolve({ data : [{things: 'no'}]}), 1000));

const store = {
  initialState: {
    drinks: [
      {
        id: 1,
        _id: 1,
        name: 'Beer',
      },
    ],
    isAuthenticated: true,
  },
  actions: {
    fetchAll: async () => axios.get('/api/drinks').then(res => res.data.drinks),
    getMovies: async (_, actions, trigger) => {
      if (!trigger) await actions.getMovies(true)
      else return { drinks: { loading: true } }

      const data = await fakeFetch()
      return { drinks: { loading: false, data } }
    },
  },
};

console.log('store', store);

export const {
  Provider,
  Consumer,
  actions,
  getState,
  connect,
  subscribe,
} = initStore(store);
