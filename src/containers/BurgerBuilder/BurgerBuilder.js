import React, {Component} from 'react';import Aux from '../../hoc/Aux';import Burger from '../../components/Burger/Burger';import BuidControls from "../../components/Burger/BuildControls/BuildControls";import Modal from "../../components/UI/Modal/Modal";import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";const INGREDIENT_PRICES = {  salad: 0.5,  cheese: 0.4,  meat: 1.3,  bacon: 0.7};class BurgerBuilder extends Component {  // constructor(props) {  //   super(props);  //   this.state = {...};  // }  state = {    ingredients: {      salad: 0,      bacon: 0,      cheese: 0,      meat: 0    },    totalPrice: 4,    purchasable: false,    purchasing: false  };  updatePurchaseState = (ingredients) => {    const sum = Object.keys(ingredients).map(igkey => ingredients[igkey]).reduce((sum, el) => sum + el, 0);    console.log(sum);    this.setState({purchasable: sum > 0});  };  purchaseHandler = () => {    this.setState({purchasing: true});  };  purchaseCancelHandler = () => {    this.setState({purchasing: false});  };  addIngedientHandler = (type) => {    const oldCount = this.state.ingredients[type];    const updatedCount = oldCount + 1;    const updatedIngredients = {      ...this.state.ingredients    };    updatedIngredients[type] = updatedCount;    const priceAddition = INGREDIENT_PRICES[type];    const oldPrice = this.state.totalPrice;    const newPrice = priceAddition + oldPrice;    this.setState({ingredients: updatedIngredients, totalPrice: newPrice});    this.updatePurchaseState(updatedIngredients);    // console.log(newPrice);  };  removeIngredientHandler = (type) => {    const oldCount = this.state.ingredients[type];    if (oldCount > 0) {      const updatedCount = oldCount - 1;      const updatedIngredients = {        ...this.state.ingredients      };      updatedIngredients[type] = updatedCount;      const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];      this.setState({ingredients: updatedIngredients, totalPrice: newPrice});      this.updatePurchaseState(updatedIngredients);    }  };  render() {    const disabledInfo = {      ...this.state.ingredients    };    for (let key in disabledInfo) {      disabledInfo[key] = disabledInfo[key] <= 0;    }    return (      <Aux>        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>          <OrderSummary ingredients={this.state.ingredients}/>        </Modal>        <Burger ingredients={this.state.ingredients}/>        <BuidControls ingredientAdded={this.addIngedientHandler}                      ingredientRemoved={this.removeIngredientHandler}                      disabled={disabledInfo}                      price={this.state.totalPrice}                      purchasable={this.state.purchasable}                      ordered={this.purchaseHandler}/>      </Aux>    );  }}export default BurgerBuilder;