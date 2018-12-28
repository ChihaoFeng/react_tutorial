import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { withRouter } from 'react-router-dom';
const burger = (props) => {
  console.log(props);
  let transformedIngredients = Object.keys(props.ingredients).map(igkey => {
    return [...Array(props.ingredients[igkey])].map((_, i) => {
      return <BurgerIngredient key={igkey + i} type={igkey}/>
    })
  }).reduce((arr, el) => {
    return arr.concat(el)
  }, []);
  // console.log(transformedIngredients);


  // let transformedIngredients = [];
  // for(let i = 0; i < Object.entries(props.ingredients).length; i++){
  //   const temp = Object.entries(props.ingredients)[i];
  //   console.log(temp);
  //   for (let j = 0; j < temp[1]; j++) {
  //     transformedIngredients.push(<BurgerIngredient key={temp[0] + j} type={temp[0]}/>)
  //   }
  // }
  // console.log(transformedIngredients);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please add some ingredients!</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
};

export default withRouter(burger);