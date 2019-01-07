import React from 'react';
import {
  Header,
  Form,
  Icon,
  Button,
  Grid,
  Segment,
  Image,
  TextArea,
  Dropdown
} from 'semantic-ui-react';
import FormField from '../parts/FormField';
import { tempOptions } from '../common/temp-options';
import { timeOptions } from '../common/time-options';

class DrinkForm extends React.Component {
  state = {
    data: {
      _id: this.props.drink._id,
      name: this.props.drink.name,
      img: this.props.drink.img,
      quote: this.props.drink.quote,
      temp: this.props.drink.temp,
      wind: this.props.drink.wind,
      time: this.props.drink.time,
      city: this.props.drink.city,
      country: this.props.drink.country,
      region: this.props.drink.resgion,
      ingredients: this.props.drink.ingredients,
      instructions: this.props.drink.instructions
    },
    index: 0,
    loading: false,
    errors: {}
  };

  componentWillReceiveProps(props) {
    this.setState({
      data: {
        _id: props.drink._id,
        name: props.drink.name,
        img: props.drink.img,
        quote: props.drink.quote,
        temp: props.drink.temp,
        wind: props.drink.wind,
        time: props.drink.time,
        city: props.drink.city,
        country: props.drink.country,
        region: props.drink.resgion,
        ingredients: props.drink.ingredients,
        instructions: props.drink.instructions
      },
      loading: false
      // covers: props.drink.covers
    });
  }

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onIngredientsChange = (field, i, e) => {
    // deep copy this.state
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    // notify the value on the array object directly
    stateCopy.data[field][i][e.target.name] = e.target.value;
    this.setState(stateCopy);
  };

  onDropdownChange = (e, data) =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [data.name]: data.value }
    });

  onChangeNumber = e =>
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [e.target.name]: parseInt(e.target.value, 10)
      }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(error =>
          this.setState({ errors: error.response.data.errors, loading: false })
        );
    }
  };

  onDelete = e => {
    e.preventDefault();
    this.setState({ loading: true });
    this.props
      .delete(this.state.data)
      .catch(error =>
        this.setState({ errors: error.response.data.errors, loading: false })
      );
  };

  removeIngredient = (field, index, e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        ingredients: this.state.data.ingredients.filter((_, i) => i !== index)
      }
    });
  };

  addIngredient = e => {
    let ingredient = {
      amount: '',
      item: ''
    };
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        ingredients: [...this.state.data.ingredients, ingredient]
      }
    });
  };

  validate = data => {
    const errors = {};
    if (!data.name) errors.name = "Can't be blank";
    if (!data.instructions) errors.instructions = "Can't be blank";
    return errors;
  };

  render() {
    const { errors, data, loading } = this.state;

    console.log('errors', errors);

    return (
      <Segment>
        <Form onSubmit={this.onSubmit} loading={loading}>
          <Grid columns={2} fluid="true" stackable>
            <Grid.Row>
              <Grid.Column>
                <FormField error={errors.name}>
                  <label htmlFor="name">Drink Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={data.name}
                    onChange={this.onChange}
                  />
                </FormField>
                {/* <Form.Field error={!!errors.name}>
                  <label htmlFor="name">Drink Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={data.name}
                    onChange={this.onChange}
                  />
                  {errors.name && <InlineError text={errors.name} />}
                </Form.Field> */}

                {/* <Form.Field error={!!errors.img}>
                  <label htmlFor="img">Img/Icon</label>
                  <input
                    type="text"
                    id="img"
                    name="img"
                    placeholder="Icon Code"
                    value={data.img}
                    onChange={this.onChange}
                  />
                  {errors.img && <InlineError text={errors.img} />}
                </Form.Field>

                <Form.Field error={!!errors.temp}>
                  <label htmlFor="temp">Temperature</label>
                  <Dropdown
                    placeholder="Temperature"
                    id="temp"
                    name="temp"
                    fluid
                    multiple
                    search
                    selection
                    value={data.temp}
                    options={tempOptions}
                    onChange={this.onDropdownChange}
                  />
                  {errors.temp && <InlineError text={errors.temp} />}
                </Form.Field>

                <Form.Field error={!!errors.time}>
                  <label htmlFor="time">Time</label>
                  <Dropdown
                    placeholder="Time"
                    id="time"
                    name="time"
                    fluid
                    multiple
                    search
                    selection
                    value={data.time}
                    options={timeOptions}
                    onChange={this.onDropdownChange}
                  />
                  {errors.time && <InlineError text={errors.time} />}
                </Form.Field>

                <Form.Field error={!!errors.ingredients}>
                  <label htmlFor="ingredients">Ingredients</label>
                  <div className="ui form small">
                    {data.ingredients && data.ingredients.length !== 0 &&
                      data.ingredients.map((el, i) => {
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
                              onChange={this.onIngredientsChange.bind(
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
                              onChange={this.onIngredientsChange.bind(
                                this,
                                'ingredients',
                                i
                              )}
                            />
                            <Button
                              type="button"
                              icon
                              onClick={this.removeIngredient.bind(
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
                      onClick={this.addIngredient}
                    >
                      Add Ingredient
                    </Button>
                    {errors.ingredients && (
                      <InlineError text={errors.ingredients} />
                    )}
                  </div>
                </Form.Field>

                <Form.Field error={!!errors.quote}>
                  <label htmlFor="quote">Quote</label>
                  <input
                    type="text"
                    id="quote"
                    name="quote"
                    placeholder="Quote"
                    value={data.quote}
                    onChange={this.onChange}
                  />
                  {errors.quote && <InlineError text={errors.quote} />}
                </Form.Field>

                <Form.Field error={!!errors.instructions}>
                  <label htmlFor="instructions">Instructions</label>
                  <TextArea
                    autoHeight
                    id="instructions"
                    name="instructions"
                    placeholder="Instructions"
                    value={data.instructions}
                    onChange={this.onChange}
                  />
                  {errors.instructions && (
                    <InlineError text={errors.instructions} />
                  )}
                </Form.Field>*/}
              </Grid.Column>

              {/*<Grid.Column>
                <Image size="small" src={data.cover} />
                {this.state.covers.length > 1 && (
                  <a role="button" tabIndex={0} onClick={this.changeCover}>
                    Another cover
                  </a>
                )}
              </Grid.Column>*/}
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Form.Button primary>Save</Form.Button>
              </Grid.Column>
              {data._id && (
                <Grid.Column>
                  <Form.Button onClick={this.onDelete}>Delete</Form.Button>
                </Grid.Column>
              )}
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    );
  }
}

export default DrinkForm;
