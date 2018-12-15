import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  const transformedIngredients = Object.keys(props.ingredients).map(igkey => {
    return [...Array(props.ingredients[igkey])].map((_, i) => {
      // console.log(_);
      // console.log(igkey + i);
      return <BurgerIngredient key={igkey + i} type={igkey}/>
    })
  });
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
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
};

export default burger;