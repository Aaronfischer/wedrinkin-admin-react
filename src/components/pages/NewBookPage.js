import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import SearchBookForm from '../forms/SearchBookForm';

export class NewBookPage extends React.Component {
  state = {
    book: null
  };

  render() {
    return (
      <Segment>
        <h1>Add new book to your collection</h1>
        <SearchBookForm />
      </Segment>
    );
  }
}

export default NewBookPage;
