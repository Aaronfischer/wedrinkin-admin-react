import React, { Component } from 'react';
import { Form, Button, Icon } from 'semantic-ui-react';

class FieldIngredients extends Component {
  render() {
    const { data, onchange, onremove, onadd } = this.props;

    return (
      <div className="ui form small">
        {data && data.length !== 0 &&
          data.map((el, i) => {
            return (
              <Form.Group
                widths="equal"
                className="ingredient-item"
                key={i}
              >
                <Form.Input
                  fluid
                  label="Item"
                  type="text"
                  id="item"
                  name="item"
                  placeholder="Item"
                  value={el.item}
                  onChange={onchange.bind(
                    this,
                    'ingredients',
                    i
                  )}
                />
                <Form.Input
                  fluid
                  label="Amount"
                  type="text"
                  id="amount"
                  name="amount"
                  placeholder="Amount"
                  value={el.amount}
                  onChange={onchange.bind(
                    this,
                    'ingredients',
                    i
                  )}
                />
                <Button
                  type="button"
                  icon
                  onClick={onremove.bind(
                    this,
                    'ingredients',
                    i
                  )}
                >
                  <Icon name="close" />
                </Button>
              </Form.Group>
            );
          })}
        <Button
          type="button"
          size="small"
          onClick={onadd}
        >
          Add Ingredient
        </Button>
      </div>
    );
  }
}

export default FieldIngredients;

