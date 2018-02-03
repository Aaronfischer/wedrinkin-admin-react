import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const AddDrinkCta = () => (
  <Card centered>
    <Card.Content textAlign="center">
      <Card.Header>Add new drink</Card.Header>
      <Link to="/drinks/new">
        <Icon name="plus circle" size="massive" />
      </Link>
    </Card.Content>
  </Card>
);

export default AddDrinkCta;
