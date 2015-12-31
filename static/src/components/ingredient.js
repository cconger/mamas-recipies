import React from 'react';

export default class Ingredient extends React.Component {
  render () {
    let ingredient = this.props.ingredient;
    let directions = '';

    if (ingredient.direction) {
      directions = <span>({ingredient.direction})</span>;
    }

    return (
      <div className="ingredient">
        <div className="item">{ingredient.description} {directions}</div>
        <div className="measurement">{ingredient.quantity} {ingredient.measurement}</div>
      </div>
    );
  }
}
