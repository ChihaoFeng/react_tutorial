import React, {Component} from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css';
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();
    // console.log(this.props.ingredients);
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Charles Fe',
        address: {
          street: '123 abc st',
          zipCode: '12010',
          country: 'US'
        },
        email: 'abc@abc.com'
      },
      deliveryMethod: 'fastest'
    };

    axios.post('/orders.json', order)
      .then(response => {
        // console.log(response);
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(error => {
        // console.log(error);
        this.setState({loading: false});
      });
  };

  render() {
    let form = (
      <form>
        <Input inputtype="input" type='text' name="name" placeholder="Your name"/>
        <Input inputtype="input" type='email' name='email' placeholder='your email'/>
        <Input inputtype="input" type='text' name='street' placeholder='your street'/>
        <Input inputtype="input" type='text' name='postal' placeholder='your postal code'/>
        <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner/>
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;