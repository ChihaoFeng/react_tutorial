import React, {Component} from 'react';import Aux from '../../hoc/Aux/Aux';import Burger from '../../components/Burger/Burger';import BuidControls from "../../components/Burger/BuildControls/BuildControls";import Modal from "../../components/UI/Modal/Modal";import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";import axios from "../../axios-orders";import Spinner from "../../components/UI/Spinner/Spinner";import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";import {connect} from 'react-redux';import * as burgerBuilderActions from '../../store/actions/burgerBuilder';class BurgerBuilder extends Component {  // constructor(props) {  //   super(props);  //   this.state = {...};  // }  state = {    purchasing: false,  };  componentDidMount() {    // console.log(this.props);    this.props.onInitIngredients();  }  updatePurchaseState = (ingredients) => {    const sum = Object.keys(ingredients).map(igkey => ingredients[igkey]).reduce((sum, el) => sum + el, 0);    // console.log(sum);    return sum > 0;  };  purchaseHandler = () => {    this.setState({purchasing: true});  };  purchaseCancelHandler = () => {    this.setState({purchasing: false});  };  purchaseContinueHandler = () => {    this.props.history.push('/checkout');  };  render() {    const disabledInfo = {      ...this.props.ings    };    for (let key in disabledInfo) {      disabledInfo[key] = disabledInfo[key] <= 0;    }    let orderSummary = null;    let burger = this.props.error? <p>Ingredients can't be loaded!</p>: <Spinner/>;    if (this.props.ings) {      burger = (        <Aux>          <Burger ingredients={this.props.ings}/>          <BuidControls ingredientAdded={this.props.onIngredientAdded}                        ingredientRemoved={this.props.onIngredientRemoved}                        disabled={disabledInfo}                        price={this.props.price}                        purchasable={this.updatePurchaseState(this.props.ings)}                        ordered={this.purchaseHandler}/>        </Aux>      );      orderSummary = <OrderSummary ingredients={this.props.ings} purchaseCanceled={this.purchaseCancelHandler}                    purchaseContinued={this.purchaseContinueHandler} price={this.props.price}/>;    }    return (      <Aux>        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>          {orderSummary}        </Modal>        {burger}      </Aux>    );  }}const mapStateToProps = state => {  return {    ings: state.ingredients,    price: state.totalPrice,    error: state.error  };};const mapDispatchToProps = dispatch => {  return {    onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.add_ingredient(ingName)),    onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.remove_ingredient(ingName)),    onInitIngredients: () => dispatch(burgerBuilderActions.init_ingredient())  };};export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));