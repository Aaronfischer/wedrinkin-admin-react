import React from 'react';
import {
  Header,
  Form,
  Icon,
  Button,
  Grid,
  Segment,
  Message,
  TextArea,
  Dropdown
} from 'semantic-ui-react';
import FormField from '../parts/FormField';
import FieldIngredients from '../parts/FieldIngredients';
import { tempOptions } from '../common/temp-options';
import { timeOptions } from '../common/time-options';
import { fetchWrapper } from '../../utils/fetch-wrapper';

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
    isLoading: false,
    isSuccess: false,
    isFailure: false,
    errors: {},
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
      isLoading: false,
      isSuccess: false,
      isFailure: false,
      errors: {},
      // covers: props.drink.covers
    });
  }

  reset = () => {
    this.setState({
      isSuccess: false,
      isFailure: false,
      isLoading: false,
    });
    console.log('RESET', this.state);
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

  validate = data => {
    const errors = {};
    console.log('validate data', data);
    if (!data.name) errors.name = "Can't be blank";
    if (!data.instructions) errors.instructions = "Can't be blank";
    return errors;
  };

  onSubmit = async (e) => {
    e.preventDefault();
    console.log('this.state', this.state, e);
    const errors = this.validate(this.state.data);
    this.setState({
      isFailure: true,
      errors,
    });
    if (Object.keys(errors).length === 0) {
      this.setState({ isLoading: true });
      // this.props
      //   .submit(this.state.data)
      //   .catch(error =>
      //     this.setState({ errors: error.response.data.errors, loading: false })
      //   );
      console.log('SAVE THE DATA', this.state.data);
      try {
        let url = `${process.env.REACT_APP_API_HOST}/drinks`;
        let method = 'POST';
        if (this.state.data._id) {
          url = `${url}/${this.state.data._id}`;
          method = 'PATCH';
        }
        await fetchWrapper(url, {
          method: method,
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ drink: this.state.data }),
        }).then(data => {
          return data.json().then((json) => {
            if (data.status === 400) {
              throw json;
            }
            this.reset();
            console.log('reset i hope');
            this.setState({
              isSuccess: true,
              data: json.drinks,
            });
            // router.navigate(`/drinks/${json.drinks._id}/edit`);
            // return router.resume();
          });
        }, (error) => { throw error; });
      } catch(error) {
        this.reset();
        this.setState({
          isFailure: true,
          errors: error.errors,
        });
      }
    }
  };

  onDelete = e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    this.props
      .delete(this.state.data)
      .catch(error =>
        this.setState({ errors: error.response.data.errors, isLoading: false })
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
    console.log('addIngredient', ingredient);
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        ingredients: [...this.state.data.ingredients, ingredient]
      }
    });
  };

  render() {
    const { errors, data, isLoading, isFailure, isSuccess } = this.state;

    return (
      <Segment>
        <Form onSubmit={this.onSubmit} success={isSuccess} error={isFailure} loading={isLoading}>
          <Message
            success
            header='Saved!'
            content='Your drink has been saved!'
          />
          <Message
            error
            header='Error!'
            content='There was an issue, please see below!'
          />
          <Grid columns={1} fluid="true" stackable>
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
                <FormField error={errors.img}>
                  <label htmlFor="img">Img/Icon</label>
                  <input
                    type="text"
                    id="img"
                    name="img"
                    placeholder="Icon Code"
                    value={data.img}
                    onChange={this.onChange}
                  />
                </FormField>
                <FormField error={errors.temp}>
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
                </FormField>
                <FormField error={errors.time}>
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
                </FormField>
                <FormField error={errors.ingredients}>
                  <label htmlFor="ingredients">Ingredients</label>
                  <FieldIngredients
                    field="ingredients"
                    name="Ingredients"
                    data={data.ingredients}
                    onchange={this.onIngredientsChange}
                    onremove={this.removeIngredient}
                    onadd={this.addIngredient}
                    // passAction={{action onRemoveItem}}

                    />
                </FormField>
                <FormField error={errors.quote}>
                  <label htmlFor="quote">Quote</label>
                  <input
                    type="text"
                    id="quote"
                    name="quote"
                    placeholder="Quote"
                    value={data.quote}
                    onChange={this.onChange}
                  />
                </FormField>
                <FormField error={errors.instructions}>
                  <label htmlFor="instructions">Instructions</label>
                  <TextArea
                    autoHeight
                    id="instructions"
                    name="instructions"
                    placeholder="Instructions"
                    value={data.instructions}
                    onChange={this.onChange}
                  />
                </FormField>

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
                <Button primary>Save</Button>
                {data._id && (
                  <Button type="button" onClick={this.onDelete}>Delete</Button>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    );
  }
}

export default DrinkForm;
