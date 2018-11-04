import React, { Component } from 'react'
import { Consumer } from '../store';

const Drinks = () => {
  return (
    <Consumer
      mapStateToProps={state => ({
        links: state.todos,
        visibilityFilter: state.visibilityFilter,
      })}
    >
      {({ todos, visibilityFilter, actions }) => (
          <div>
            <p>Age: {context.state.age}</p>
            <p>Name: {context.state.name}</p>
            <button onClick={context.actions.increment}>🍰🍥🎂</button>
          </div>
      )}
    </Consumer>
  )
};

export default Drinks;
