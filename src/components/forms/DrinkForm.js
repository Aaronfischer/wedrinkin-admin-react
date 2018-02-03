import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Grid, Segment, Image } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class DrinkForm extends React.Component {
  state = {
    data: {
      // id: this.props.drink.id,
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
    // covers: this.props.drink.covers,
    index: 0,
    loading: false,
    errors: {}
  };

  componentWillReceiveProps(props) {
    this.setState({
      data: {
        id: props.drink.id,
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
      // covers: props.drink.covers
    });
  }

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onChangeNumber = e =>
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [e.target.name]: parseInt(e.target.value, 10)
      }
    });

  // changeCover = () => {
  //   const { index, covers } = this.state;
  //   const newIndex = index + 1 >= covers.length ? 0 : index + 1;
  //   this.setState({
  //     index: newIndex,
  //     data: { ...this.state.data, cover: covers[newIndex] }
  //   });
  // };

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!data.name) errors.name = "Can't be blank";
    if (!data.instructions) errors.instructions = "Can't be blank";
    return errors;
  };

  render() {
    const { errors, data, loading } = this.state;

    return (
      <Segment>
        <Form onSubmit={this.onSubmit} loading={loading}>
          <Grid columns={2} fluid="true" stackable>
            <Grid.Row>
              <Grid.Column>
                <Form.Field error={!!errors.name}>
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
                </Form.Field>

                <Form.Field error={!!errors.img}>
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
                  <input
                    type="text"
                    id="instructions"
                    name="instructions"
                    placeholder="Instructions"
                    value={data.instructions}
                    onChange={this.onChange}
                  />
                  {errors.instructions && <InlineError text={errors.instructions} />}
                </Form.Field>
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
              <Button primary>Save</Button>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    );
  }
}

DrinkForm.propTypes = {
  submit: PropTypes.func.isRequired,
  drink: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    img: PropTypes.string,
    quote: PropTypes.string,
    temp: PropTypes.arrayOf(PropTypes.string),
    wind: PropTypes.string,
    time: PropTypes.arrayOf(PropTypes.string),
    city: PropTypes.string,
    country: PropTypes.string,
    region: PropTypes.string,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        item: PropTypes.string,
        amount: PropTypes.string
      })
    ),
    instructions: PropTypes.string
  }).isRequired
};

export default DrinkForm;
