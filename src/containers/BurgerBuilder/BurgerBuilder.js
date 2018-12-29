import React, {Component} from 'react';import Aux from '../../hoc/Aux/Aux';import Burger from '../../components/Burger/Burger';import BuidControls from "../../components/Burger/BuildControls/BuildControls";import Modal from "../../components/UI/Modal/Modal";import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";import axios from "../../axios-orders";import Spinner from "../../components/UI/Spinner/Spinner";import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";const INGREDIENT_PRICES = {  salad: 0.5,  cheese: 0.4,  meat: 1.3,  bacon: 0.7};class BurgerBuilder extends Component {  // constructor(props) {  //   super(props);  //   this.state = {...};  // }  state = {    ingredients: null,    totalPrice: 4,    purchasable: false,    purchasing: false,    loading: false,    error: false  };  componentDidMount() {    console.log(this.props);    axios.get('/ingredients.json').then(response => {      this.setState({ingredients: response.data});    })      .catch(error => {        this.setState({error: true});      });  }  updatePurchaseState = (ingredients) => {    const sum = Object.keys(ingredients).map(igkey => ingredients[igkey]).reduce((sum, el) => sum + el, 0);    // console.log(sum);    this.setState({purchasable: sum > 0});  };  purchaseHandler = () => {    this.setState({purchasing: true});  };  purchaseCancelHandler = () => {    this.setState({purchasing: false});  };  purchaseContinueHandler = () => {    // alert('You continue!');    const queryParams = [];    for (let i in this.state.ingredients) {      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));    }    queryParams.push('price=' + this.state.totalPrice);    const queryString = queryParams.join('&');    this.props.history.push({      pathname: '/checkout',      search: '?' + queryString    });  };  addIngedientHandler = (type) => {    const oldCount = this.state.ingredients[type];    const updatedCount = oldCount + 1;    const updatedIngredients = {      ...this.state.ingredients    };    updatedIngredients[type] = updatedCount;    const priceAddition = INGREDIENT_PRICES[type];    const oldPrice = this.state.totalPrice;    const newPrice = priceAddition + oldPrice;    this.setState({ingredients: updatedIngredients, totalPrice: newPrice});    this.updatePurchaseState(updatedIngredients);    // console.log(newPrice);  };  removeIngredientHandler = (type) => {    const oldCount = this.state.ingredients[type];    if (oldCount > 0) {      const updatedCount = oldCount - 1;      const updatedIngredients = {        ...this.state.ingredients      };      updatedIngredients[type] = updatedCount;      const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];      this.setState({ingredients: updatedIngredients, totalPrice: newPrice});      this.updatePurchaseState(updatedIngredients);    }  };  render() {    const disabledInfo = {      ...this.state.ingredients    };    for (let key in disabledInfo) {      disabledInfo[key] = disabledInfo[key] <= 0;    }    let orderSummary = null;    let burger = this.state.error? <p>Ingredients can't be loaded!</p>: <Spinner/>;    if (this.state.ingredients) {      burger = (        <Aux>          <Burger ingredients={this.state.ingredients}/>          <BuidControls ingredientAdded={this.addIngedientHandler}                        ingredientRemoved={this.removeIngredientHandler}                        disabled={disabledInfo}                        price={this.state.totalPrice}                        purchasable={this.state.purchasable}                        ordered={this.purchaseHandler}/>        </Aux>      );      orderSummary = <OrderSummary ingredients={this.state.ingredients} purchaseCanceled={this.purchaseCancelHandler}                    purchaseContinued={this.purchaseContinueHandler} price={this.state.totalPrice}/>;    }    if (this.state.loading) {      orderSummary = <Spinner/>;    }    return (      <Aux>        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>          {orderSummary}        </Modal>        {burger}      </Aux>    );  }}export default withErrorHandler(BurgerBuilder, axios);