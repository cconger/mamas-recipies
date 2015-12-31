import React from 'react';
import Ingredient from './ingredient';

export default class IngredientSection extends React.Component {

  title () {
    if (this.props.name !== "⚠") {
      return (
        <div className="title">
          <h3>{this.props.name}</h3>
        </div>
      );
    }

    return null;
  }

  render () {
    let ingredients = this.props.section.map( (ingredient) => {
      return <Ingredient key={ingredient.description} ingredient={ingredient} />;
    });

    return (
      <div>
        {this.title()}
        <div className="ingredientsList">
          {ingredients}
        </div>
      </div>
    );
  }
}
