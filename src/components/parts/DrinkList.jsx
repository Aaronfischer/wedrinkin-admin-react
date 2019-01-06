import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Icon } from 'semantic-ui-react';

const DrinkList = ({ drinks }) => {
  return (
    <Card.Group>
      {drinks.map(drink => (
        <Card key={drink._id} as={Link} to={`/drinks/${drink._id}`}>
          <Card.Content>
            <Image
              floated="right"
              size="mini"
              src="https://semantic-ui.com/images/avatar/large/steve.jpg"
            />
            <Card.Header>{drink.name}</Card.Header>
            {drink.time.length !== 0 && (
              <Card.Meta>{drink.time.map(time => `${time}, `)}</Card.Meta>
            )}
            <Card.Description>{drink.instructions}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon name="edit" />
            Edit
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
};

export default DrinkList;
