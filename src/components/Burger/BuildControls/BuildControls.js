import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const control = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    {control.map(ctrl => {
      // console.log(ctrl);
      // console.log(ctrl['label']);
      // console.log(ctrl.label);
      return <BuildControl key={ctrl.label}
                           label={ctrl.label}
                           added={() => props.ingredientAdded(ctrl.type)}
                           removed={() => props.ingredientRemoved(ctrl.type)}
                           disabled={props.disabled[ctrl.type]}/>;
    })}
  </div>
);

export default buildControls;